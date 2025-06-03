import React, { useEffect, useState } from "react";
import { PaginationProps } from "../types/PaginationProps";
import axios, { HttpStatusCode } from "axios";
import { alertInfo, noNetWork, sessionNotice } from "../helpers/Notification";

const Pagination: React.FC<PaginationProps> = ({
  setData,
  setLoading,
  pageUrl,
  color,
  refresh,
}) => {
  const [pageInfo, setPageInfo] = useState<any>({});
  const [links, setLinks] = useState<any>({});

  const fetchData = async (url: string = pageUrl) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = response.data;
      setData(data?._embedded?.[Object.keys(data._embedded)[0]] || []);
      setPageInfo(data.page || {});
      setLinks(data._links || {});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response === undefined) {
          noNetWork();
        } else if (error.response.status === HttpStatusCode.Unauthorized) {
          sessionNotice();
        } else {
          alertInfo("info", error.response.data?.message);
        }
      } else {
        console.error("Erreur inconnue:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleNavigation = (url: string) => {
    if (url) {
      fetchData(url);
    }
  };

  const buildPageLink = (pageNumber: Number) => {
    if (links.self?.href) {
      const url = new URL(links.self.href);
      const params = new URLSearchParams(url.search);
      params.set("page", pageNumber.toString());
      url.search = params.toString();
      return url.toString();
    }
    return null;
  };

  const buildPrevLink = () => {
    if (links.self?.href && pageInfo.number > 0) {
      const url = new URL(links.self.href);
      const params = new URLSearchParams(url.search);
      const currentPage = parseInt(params.get("page")!, 10);
      params.set("page", (currentPage - 1).toString());
      url.search = params.toString();
      return url.toString();
    }
    return null;
  };

  const buildNextLink = () => {
    if (links.self?.href && pageInfo.number < pageInfo.totalPages - 1) {
      const url = new URL(links.self.href);
      const params = new URLSearchParams(url.search);
      const currentPage = parseInt(params.get("page")!, 10);
      params.set("page", (currentPage + 1).toString());
      url.search = params.toString();
      return url.toString();
    }
    return null;
  };

  const prevLink = buildPrevLink();
  const nextLink = buildNextLink();

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
          {/* Précédent */}
          <button
            className={`btn ${color ?? "btn-outline-primary"}`}
            onClick={() => handleNavigation(prevLink!)}
            disabled={!prevLink}>
            Précédent
          </button>

          {/* Numéros de pages */}
          {Array.from({ length: pageInfo.totalPages || 0 }, (_, index) => (
            <button
              key={index}
              className={`btn ${
                pageInfo.number === index
                  ? color ?? "btn-primary"
                  : color ?? "btn-outline-primary"
              }`}
              onClick={() => handleNavigation(buildPageLink(index)!)}>
              {index + 1}
            </button>
          ))}

          {/* Suivant */}
          <button
            className={`btn ${color ?? "btn-outline-primary"}`}
            onClick={() => handleNavigation(nextLink!)}
            disabled={!nextLink}>
            Suivant
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pagination;

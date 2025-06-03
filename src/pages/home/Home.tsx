import React from "react";
import Layout from "../../templates/Layout";
import HomeCard from "../../components/HomeCard";

const Home: React.FC = () => {
  return (
    <Layout title="Home">
      <HomeCard title={"Total users"} value={25599} color="danger" />
    </Layout>
  );
};

export default Home;

import metadata from "@/utility/config";
import Head from "next/head";
import React from "react";

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favico.ico" sizes="any" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:image" content={metadata.image} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;

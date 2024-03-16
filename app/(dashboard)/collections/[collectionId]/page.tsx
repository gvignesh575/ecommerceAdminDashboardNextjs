"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import { Loader } from "@/components/custom ui/Loader";
import React, { useEffect, useState } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`);
      const data = await res.json();
      setCollectionDetails(data);
    } catch (err) {
      console.log("CollectionId Get error : ", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCollectionDetails();
    setLoading(false);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;

import React, { useState } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`);
    } catch (err) {
      console.log("CollectionId Get error : ", err);
    }
  };

  return <div>CollectionDetails</div>;
};

export default CollectionDetails;

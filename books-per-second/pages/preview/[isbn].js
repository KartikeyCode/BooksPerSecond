import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Timer from "@/components/timer";
import { GlobalContext } from "@/context/GlobalContext";

const Preview = (props) => {
  const router = useRouter();
  const { isStarted } = useContext(GlobalContext);
  const isbn = router.query.isbn;
  console.log(router.query);
  useEffect(
    () => {
      localStorage.setItem("isbn", JSON.stringify(props.isbn));
      // setCurrentIsbn(isbn);
    },
    [router.isReady],
    []
  );
  return (
    <div>
      <h2>{props.title}</h2>
      {props.bookUrl && (
        //! remove scrolls (exploit)
        <div className={isStarted?"":"hidden"} style={{ width: "100%", height: "800px" }}>
          <iframe
            src={props.bookUrl}
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="overscroll-none"
          ></iframe>
        </div>
      )}
      <div className={`w-full h-[650px] xl:h-[800px] bg-black ${isStarted?"hidden":""}`}>

      </div>
      <Timer />
    </div>
  );
};

export default Preview;

export async function getServerSideProps(context) {
  const isbn = context.query.isbn;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = response.data.items[0].volumeInfo.previewLink;
    const bookUrl = `${data}&output=embed`;
    const title = response.data.items[0].volumeInfo.title;
    return {
      props: { bookUrl, title, isbn }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      // todo : redirect to an error handling page that says that the book is not valid/available
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

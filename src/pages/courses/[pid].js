import { useRouter } from "next/router";

import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "@/lib/useUser";

import React from "react";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body.course;
  }
};

export default function Course() {
  const router = useRouter();
  const { pid } = router.query;

  const { signedIn, userInfo } = useUser();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseData(pid).then((crs) => {
      setCourseData(crs);
    });
  }, [router]);

  const renderCourseData = () => {
    return (
      <React.Fragment>
        <h1>{courseData.name}</h1>
        <p>{courseData.description}</p>
        <span>
          {courseData.units.map((u) => (
            <p>
              {u.name} - {u.id}
            </p>
          ))}
        </span>
      </React.Fragment>
    );
  };

  return <div>{courseData ? renderCourseData() : <p>{pid}</p>}</div>;
}

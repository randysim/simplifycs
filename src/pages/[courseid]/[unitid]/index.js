import  { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
import useUser from "@/lib/useUser";

const getCourseData = async (id) => {
    if (id) {
      let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
      let body = data.data;
  
      if (body.success) return body;
    }
};

export default function Unit() {
    const router = useRouter();
    const { courseid, unitid } = router.query;

    const { signedIn, userInfo } = useUser();

    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseData(courseid)
        .then((crs) => {
            setCourseData(crs);
         })
        .catch(e => {
            router.push("/dashboard");
        })
    }, [router]);


}
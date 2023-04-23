import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Lesson() {
    const router = useRouter();
    const { courseid, unitid, lessonid } = router.query;

    useEffect(() => {
        console.log(courseid, unitid, lessonid);
    }, [router]);
}
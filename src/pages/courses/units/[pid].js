import  {useRouter } from "next/router";

export default function Unit() {
    const router = useRouter();
    const { pid } = router.query;

    useEffect(() => {

    }, [router]);
}
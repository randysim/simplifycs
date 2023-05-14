import { useRouter } from "next/router";
import useSWR from "swr";

import axios from "axios";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function useUser(noredirect = false) {
  const { data } = useSWR("/api/getuser", fetcher);
  const router = useRouter();

  let value = { signedIn: false, loading: true, userInfo: {} };

  if (data) {
    value.loading = false;

    if (data.success) {
      value.signedIn = true;
      value.userInfo = data.userInfo;
    } else if (!noredirect) {
      router.push("/login");
    }
  }

  return value;
}

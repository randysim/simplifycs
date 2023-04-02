import { useRouter } from "next/router";
import useSWR from "swr";

import axios from "axios";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function useUser() {
  const { data } = useSWR("/api/getuser", fetcher);
  const router = useRouter();

  let value = { signedIn: false, userInfo: {} };

  if (data) {
    if (data.success) {
      value.signedIn = true;
      value.userInfo = data.userInfo;
    }
  }

  return value;
}

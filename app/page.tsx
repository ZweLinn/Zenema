import type { Metadata } from "next";
import HomePage from "./home/page";

export default function IndexPage() {
  return <HomePage/>;
}

export const metadata: Metadata = {
  title: "Zenema",
};

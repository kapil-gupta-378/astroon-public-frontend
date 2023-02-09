import { useRouter } from 'next/router';
import React from 'react';
import BlogDetail from '../../../src/containers/blog-detail';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogDetailPages = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <BlogDetail isAdmin="isAdmin" id={id} data={data} backBtn={true} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${APP_URL}blog/${id}`);
  const dataJSON = await res.json();
  const data = await dataJSON.data;

  return { props: { data } };
}
export default BlogDetailPages;

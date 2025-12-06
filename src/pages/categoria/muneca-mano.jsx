import Page, { getServerSideProps as _getServerSideProps } from './[slug]';

export default Page;

export async function getServerSideProps(context) {
  return await _getServerSideProps({ ...context, params: { slug: 'muneca-mano' } });
}

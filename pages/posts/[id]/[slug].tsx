import { Post, PostService } from "tnn-sdk";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ResourceNotFoundError } from "tnn-sdk/dist/errors";
import Head from "next/head";
import PostHeader from "../../../components/PostHeader";

interface PostProps extends NextPageProps {
    post?: Post.Detailed;
    host?: string;
}

export default function PostPage(props: PostProps) {
    const { post } = props;
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`http://${props.host}/${props.post?.id}/${props.post?.slug}`}
                />
            </Head>
            {post && (
                <>
                    <PostHeader
                        thumbnail={post?.imageUrls.large}
                        createdAt={post?.createdAt}
                        editor={post?.editor}
                        title={post?.title}
                    />
                </>
            )}
        </>
    );
}

interface Params extends ParsedUrlQuery {
    id: string;
    slug: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
    async ({ params, req }) => {
        try {
            if (!params) return { notFound: true };

            const { id } = params;
            const postId = Number(id);

            if (isNaN(postId)) return { notFound: true };

            const post = await PostService.getExistingPost(postId);

            return {
                props: {
                    post,
                    host: req.headers.host,
                },
            };
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                return { notFound: true };
            }
            return {
                props: {
                    error: {
                        message: error.message,
                        statusCode: error.data?.status || 500,
                    },
                },
            };
        }
    };
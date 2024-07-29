import {ParsedUrlQuery} from "querystring";
import {GetServerSideProps} from "next";
import {Post, PostService} from "tnn-sdk";

interface PostProps {
    post?: Post.Detailed
}

export default function PostPage(props: PostProps) {
    return <div>{props.post?.title}</div>
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> = async ({ params }) => {

    try {
        if (!params) return { notFound: true };

        const { id } = params;
        const postId = Number(id);

        if (isNaN(postId)) return { notFound: true };

        const post = await PostService.getExistingPost(postId);

        return {
            props: {
                post
            }
        }
    } catch (err) {
        return  {
            props: {}
        }
    }
}
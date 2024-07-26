import Head from 'next/head'
import FeaturedPost from "../components/FeaturedPost";
import {Post, PostService} from "tnn-sdk";
import {GetServerSideProps} from "next";
import {ServerResponse} from "node:http";
import PostCard from "../components/PostCard";
import PostsGrid from "../components/PostsGrid";

interface HomeProps {
    posts?: Post.Paginated;
}

export default function Home(props: HomeProps) {

    const {posts} = props;
    
    return (
        <div>
            <Head>
                <title>AlgaNews</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {posts?.content && <FeaturedPost postSummary={posts?.content[0]} />}
            <PostsGrid>
                {posts?.content?.slice(1).map(post => {
                    return (
                        <PostCard key={post.id} post={post} />
                    )
                })}
            </PostsGrid>

        </div>
  )
}

function sendToHomePage(res:  ServerResponse) {
    res.statusCode = 302;
    res.setHeader('Location', '/?page=1');
    return {props: {}};
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
    { query, res}
) => {
    const {page: _page} = query;

    const page = Number(_page);

    if (isNaN(page) || page < 1) {
        return sendToHomePage(res);
    }

    const posts = await PostService.getAllPosts({ page: Number(page) - 1 });

    if (!posts.content?.length) {
        return sendToHomePage(res);
    }

    return {
        props: {
            posts
        }
    }
}

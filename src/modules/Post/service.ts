import { PostInterface, PostResponse } from "./model";
import postRepository from "./repository";
import * as dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import userService from "../User/service";
import likeRepository from "../Like/repository";
import inspirationRepository from "../Inspiration/repository";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion!,
});

const getAllPosts = async (): Promise<PostInterface[]> => {
  const posts = await postRepository.getAllPosts();
  for (let post of posts) {
    // For each post, generate a signed URL and save it to the post object
    const image = post.imageURL;
    post.imageURL = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: image,
      }),
      { expiresIn: 60 } // 60 seconds
    );
  }

  return posts;
};

const getPostById = async (
  postId: string,
  loggedInUserId?: string
): Promise<PostResponse | null> => {
  try {
    const post = await postRepository.getPostById(postId);
    if (post) {
      const image = post.imageURL;
      post.imageURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: image,
        }),
        { expiresIn: 60 }
      );

      const user = await userService.getMe(post.userId);
      let like;
      if (loggedInUserId) {
        like = await likeRepository.getLikesByPostAndUser(
          postId,
          loggedInUserId
        );
      }
      let inspiration;
      if (loggedInUserId) {
        inspiration =
          await inspirationRepository.getInspitaionByUserIdAndPostId(
            loggedInUserId,
            postId
          );
      }
      const dataToReturn: PostResponse = {
        _id: post._id,
        userId: post.userId,
        title: post.title,
        description: post.description,
        tags: post.tags,
        imageURL: post.imageURL,
        creationDate: post.creationDate,
        userFirstName: user?.name,
        userLastName: user?.surname,
        hasLiked: like ? true : false,
        isInspired: inspiration ? true : false,
      };
      return dataToReturn;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

const getPostsByUserId = async (userId: string) => {
  try {
    const posts = await postRepository.getPostsByUserId(userId);
    for (let post of posts) {
      // For each post, generate a signed URL and save it to the post object
      const image = post.imageURL;
      post.imageURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: image,
        }),
        { expiresIn: 60 }
      );
    }

    return posts;
  } catch (error: any) {
    return null;
  }
};

const updatePost = async (
  postId: string,
  data: Partial<PostInterface>
): Promise<PostInterface | null> => {
  try {
    return await postRepository.updatePost(postId, data);
  } catch (error: any) {
    return null;
  }
};

const deletePost = async (postId: string) => {
  try {
    return await postRepository.deletePost(postId);
  } catch (error: any) {
    return null;
  }
};

const getPostBySearch = async (search: string): Promise<PostInterface[]> => {
  const posts = await postRepository.findPostBySearch(search);
  for (let post of posts) {
    // For each post, generate a signed URL and save it to the post object
    const image = post.imageURL;
    post.imageURL = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: image,
      }),
      { expiresIn: 60 }
    );
  }

  return posts;
};

const getPostByTags = async (tags: string[]): Promise<PostInterface[]> => {
  const posts = await postRepository.findPostByTags(tags);
  for (let post of posts) {
    // For each post, generate a signed URL and save it to the post object
    const image = post.imageURL;
    post.imageURL = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: image,
      }),
      { expiresIn: 60 }
    );
  }

  return posts;
};

const getPostsBySearchAndTags = async (
  search: string,
  tags: string[]
): Promise<PostInterface[]> => {
  const posts = await postRepository.findPostsBySearchAndTags(search, tags);
  for (let post of posts) {
    // For each post, generate a signed URL and save it to the post object
    const image = post.imageURL;
    post.imageURL = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: image,
      }),
      { expiresIn: 60 }
    );
  }

  return posts;
};

export default {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  getPostBySearch,
  getPostByTags,
  getPostsBySearchAndTags,
};

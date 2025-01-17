import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deletePreviousFile, uploadVideoOnCloudinary,uploadImagesOnCloudinary } from "../utils/cloudinary.js"
import { response } from "express"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page, limit, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    if (!userId) {
        throw new ApiError(400, "userId is undefined")
    }

    const videos = await Video.find({owner: userId})
        .sort({ [sortBy]: sortType == "ascending" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))

    if (!videos) {
        new ApiError(404, "video does not exists")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, { videos }, "all videos of user fetched succefully")
        )


})

const publishAVideo = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video
    const { title, description } = req.body
    const video = req.files?.videoFile[0]?.path
    const thumbnail = req.files?.thumbnail[0]?.path

    const returnedVideoDeatilsFromCloudinary = await uploadVideoOnCloudinary(video)
    const returnedThumbnailDeatilsFromCloudinary = await uploadImagesOnCloudinary(thumbnail)
    if (!returnedVideoDeatilsFromCloudinary) {
        throw new ApiError(404, "video is undefined")
    }

    if (!returnedThumbnailDeatilsFromCloudinary) {
        throw new ApiError(404, "thumbnail is undefined")
    }

    const uploadVideo = await Video.create(
        {
            title,
            description,
            thumbnail: returnedThumbnailDeatilsFromCloudinary.url,
            videoFile:{default: returnedVideoDeatilsFromCloudinary.playback_url, allManualQuality: returnedVideoDeatilsFromCloudinary.eager.map((val)=> val.secure_url)},
            duration: returnedVideoDeatilsFromCloudinary.duration,
            isPublished: true,
            owner: req.user?._id
        }
    )

    if (!uploadVideo) {
        throw new ApiError(500, "uplodation failed")
    }

    res
        .status(200)
        .json(
            new ApiResponse(200,
                { uploadVideo },
                "Video uploaded successfully"
            )
        )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if (!videoId) {
        throw new ApiError(404, "videoId not found")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(500, "unable to get video from dataBase")
    }

    res
        .status(200)
        .json(
            new ApiResponse(200,
                { video },
                "video fetched successfully"
            )
        )
})

const updateVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    const { title, description } = req.body
    const thumbnail = req.file?.path
    //TODO: update video details like title, description, thumbnail
    const uploadedOnCloudinary = await uploadOnCloudinary(thumbnail)

    const previousThumbnail = await Video.findById(videoId)

    const previousThumbnailId = previousThumbnail.thumbnail.split("/").pop().split(".").shift()

    if (!videoId) {
        throw new ApiError(400, "videoId is undefined")
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId, {
        title,
        description,
        thumbnail: uploadedOnCloudinary.url
    }, { new: true })

    const currentThumbnailId = updatedVideo.thumbnail.split("/").pop().split(".").shift()

    if (previousThumbnailId !== currentThumbnailId) {
        await deletePreviousFile(previousThumbnailId)
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, { updatedVideo }, "video details got updated")
        )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if (!videoId) {
        throw new ApiError(400, "videoId is undefined")
    }

    const deleteVideo = await Video.findByIdAndDelete(videoId)

    if (!deleteVideo) {
        throw new ApiError(500, "server error failed to delete video")
    }

    const clodinaryVideoId = deleteVideo.videoFile.split("/").pop().split(".").shift()
    const clodinaryThumbnailId = deleteVideo.thumbnail.split("/").pop().split(".").shift()

    const deletedVideoFromCloudinary = await deletePreviousFile(clodinaryVideoId, "video")
    const deletedThumbnailFromCloudinary = await deletePreviousFile(clodinaryThumbnailId)

    if (!deletedVideoFromCloudinary) {
        throw new ApiError(500, "deletion of clodinary video files failed")
    }

    if (!deletedThumbnailFromCloudinary) {
        throw new ApiError(500, "deletion of clodinary image files failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {},
                "video deleted successfully"
            )
        )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    console.log(videoId);
    //TODO: toggle publish status

    if (!videoId) {
        throw new ApiError(400, "video is undefind")
    }

    const videoStatus = await Video.findById(
        videoId
    )

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            isPublished: !videoStatus.isPublished
        },
        { new: true }
    )

    if (!video) {
        throw new ApiError(404, "video not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { video }, "video status changed succesfully")
        )

})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}

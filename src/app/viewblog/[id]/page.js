import VideoPlayer from "@/components/video/VideoPlayer"
const ViewBlog = ({ params }) => {
    return(
        <>
            <div className="flex items-center justify-center mt-20 text-black mx-auto">
                หน้าดู blog {params.id}
            </div>
            <VideoPlayer />
        </>
    )
}
export default ViewBlog
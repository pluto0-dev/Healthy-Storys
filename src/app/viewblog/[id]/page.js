const ViewBlog = ({ params }) => {
    return(
        <>
            <div className="flex items-center justify-center my-20 text-black mx-auto">
                หน้าดู blog {params.id}
            </div>
        </>
    )
}
export default ViewBlog
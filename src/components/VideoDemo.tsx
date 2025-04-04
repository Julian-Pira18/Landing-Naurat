
const VideoDemo = () => {
    return (
        <div className="flex justify-center items-center">
            <video className="w-full max-w-4xl rounded-2xl shadow-lg" controls>
                <source src="/demo/demo.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
            </video>
        </div>
    );
};

export default VideoDemo;

import { useEffect } from "react";
import mediumZoom from "medium-zoom";

const ImageZoomer = () => {
    useEffect(() => {
        const images = document.querySelectorAll(".content img");

        mediumZoom(images)
    }, [])
    
    return <></>
}

export default ImageZoomer;
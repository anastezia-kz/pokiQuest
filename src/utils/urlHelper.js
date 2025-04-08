export function generateImageUrl(path, width, height){
    return `https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=${width},height=${height},fit=cover,f=auto/${path}`;
}

const Gallery = (props) => {
    return (
        <div style={{ 'width': '100%' }}>
            <img style={{ 'maxWidth': '100vw' }} src={props.artImg} alt={props.title} />
        </div>
    )
};

export default Gallery;
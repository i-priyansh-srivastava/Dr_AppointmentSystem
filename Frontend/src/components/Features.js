import '../styles/Features.css'

const Features = (props) => {
    return (
        <div className="featuresContainer">
            <h2 className="featuresHeading">Our Features</h2>
            <div className="cards">
                {
                    props.Featuredata.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <div className="circle"></div>
                                <h3 className='cardTitle'>{item.title}</h3>
                                <p>{item.para}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Features;

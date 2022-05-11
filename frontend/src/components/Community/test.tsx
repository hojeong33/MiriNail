import "./test.scss";
const Test = () => {
  return (
    <div className="main-container">
      <div className="grid-container">
        <div className="card">
          <div className="card__image">
            <img
              src="https://images.pexels.com/photos/443416/pexels-photo-443416.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt=""
            />
          </div>
        </div>
        <div className="card">
          <div className="card__image">
            <img
              src="https://images.pexels.com/photos/542411/pexels-photo-542411.png?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt=""
            />
          </div>
        </div>
        <div className="card">
          <div className="card__content">dfsklfjskdlfjkls</div>
        </div>
        <div className="card card--horizontal">
          <div className="card__image">
            <img
              src="https://images.pexels.com/photos/614494/pexels-photo-614494.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt=""
            />
          </div>
        </div>
        <div className="card card--featured card__side-by-side--m">
          <div className="card__image">
            <img
              src="https://images.pexels.com/photos/614494/pexels-photo-614494.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt=""
            />
            <div className="card__content padding-large--l">dsfsdfs</div>
          </div>
        </div>
        <div className="card card--vertical">
          <div className="card__image">
            <img
              src="https://images.pexels.com/photos/614494/pexels-photo-614494.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;

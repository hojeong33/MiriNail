const ProgressBar = (props:any) => {
  const { bgcolor, completed, barWidth } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed / barWidth * 100}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    // textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;
import { useBarcode } from 'react-barcodes';

const BarCode = (props) => {

  const {inputRef} = useBarcode({
    value: props.value,
    options: {
      background: '#ffffff00',
      height: '30',
      width: '1',
      fontSize: '12'
    }
  });
  
    return (
    <div>
      <img
        ref={inputRef}
        alt={props.value}
      />
    </div>
  )
}

export default BarCode;

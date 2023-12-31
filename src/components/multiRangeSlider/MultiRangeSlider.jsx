import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import './multiRangeSlider.css';

const MultiRangeSlider = ({
  min,
  max,
  onChangeLeft,
  onChangeRight,
  minVal,
  maxVal,
  minValRef,
  maxValRef,
  handleMinInputChange,
  handleMaxInputChange,
}) => {
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent, maxValRef]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent, minValRef]);

  return (
    <>
      <div className="slidercontainer">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={onChangeLeft}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && '5' }}
        />
        <input type="range" min={min} max={max} value={maxVal} onChange={onChangeRight} className="thumb thumb--right" />

        <div className="flex flex-col gap-6">
          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-2">Min</div>
            <Input placeholder={'min'} value={minVal} onChange={handleMinInputChange} />
            <div className="mx-4"> - </div>
            <div className="mr-2">Max</div>
            <Input placeholder={'max'} value={maxVal} onChange={handleMaxInputChange} />
          </div>
        </div>
      </div>
    </>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onChangeLeft: PropTypes.func,
  onChangeRight: PropTypes.func,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  minValRef: PropTypes.number,
  maxValRef: PropTypes.number,
  handleMinInputChange: PropTypes.func,
  handleMaxInputChange: PropTypes.func,
};

export default MultiRangeSlider;

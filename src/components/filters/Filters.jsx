import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';

const Filters = ({ onPriceChange }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200000);

  const handlePriceChange = ({ min, max }) => {
    // setMinValue(min);
    // setMaxValue(max);
    onPriceChange({ min, max });
  };

  return (
    <div>
      <div className="bg-[#f2f3f5] lg:w-[350px] w-full p-8">
        <div className="font-semibold text-xl mb-8">Filters</div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="Price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="py-8">
                  <MultiRangeSlider min={minValue} max={maxValue} onChange={handlePriceChange} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Filters;

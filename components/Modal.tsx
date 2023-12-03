"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState, useContext } from "react";
import { Combobox } from "@headlessui/react";
import { places } from "@/utilities/places";
import CustomButton from "./CustomButton";
//filter context
import { FilterContext } from "@/app/page";
const Modal = ({ modalRef }) => {
  //close modal on click
  const closeModal = () => {
    modalRef.current.close();
  };
  //salary range state
  const [salary, setSalary] = useState([0, 3000]);
  const onChangeRangeEvent = (value: number[]) => {
    // console.log(value);
    setSalary(() => [...value]);
  };
  const [querry, setQuerry] = useState("");
  //combomox filtered items

  const filteredPlaces =
    querry === ""
      ? places
      : places.filter((place) => {
          return place.toLowerCase().includes(querry.toLowerCase());
        });

  //filter state
  const { salaryRange, setSalaryRange } = useContext(FilterContext);
  const { jobLocation, setJobLocation } = useContext(FilterContext);

  const handleFilterOptions = () => {
    setSalaryRange(salary);
    setJobLocation(querry);
    closeModal();
  };
  const resetFilterOptions = () => {
    setSalary([0, 3000]);
    setQuerry("");
  };
  return (
    <dialog
      ref={modalRef}
      className="px-5 py-2 focus:border-none focus:outline-none w-80 rounded-lg overflow-y-hidden"
    >
      {/*Top section */}
      <div className="flex justify-around items-start">
        <h1 className="text-lg font-Manrope">Filter the ads</h1>
        {/*Close button */}
        <div
          className="flex w-10 h-10 ml-32 cursor-pointer hover:scale-125 transition-transform"
          onClick={closeModal}
        >
          <span className="h-1 w-full bg-primary hover:bg-primaryHover translate-y-3 translate-x-1/2 rotate-45 scale-125 rounded-full"></span>
          <span className="h-1 w-full bg-primary hover:bg-primaryHover translate-y-3 -translate-x-1/2 -rotate-45 scale-125 rounded-full"></span>
        </div>
      </div>
      {/*content section */}
      <div className="flex flex-col py-2 px-3 relative">
        {/*salary filter */}
        <div className="flex flex-col p-2">
          <h1 className="font-Manrope">Filter by salary:</h1>
          <h1 className="font-Rubik font-bold text-primaryHover">
            &euro;{salary[0]} - &euro;{salary[1]}
          </h1>
          <Slider
            className="my-3"
            trackStyle={{ backgroundColor: "blue" }}
            handleStyle={{
              height: 15,
              width: 15,
              marginTop: -6,
            }}
            range
            max={25000}
            defaultValue={[100, 2500]}
            keyboard
            value={salary}
            onChange={onChangeRangeEvent}
            ariaLabelForHandle={salary.toString()}
          />
        </div>
        {/*location filter */}
        <div className="flex flex-col p-3 gap-5">
          <h1 className="font-Manrope">Filter by location:</h1>
          {/*Combobox */}
          <Combobox>
            <Combobox.Input
              onChange={(e) => setQuerry(e.target.value)}
              value={querry}
              name="location"
              placeholder="Select a location"
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <Combobox.Options className="z-10 bg-lighter p-8 rounded-3xl flex mx-5 flex-wrap overflow-y-auto h-80">
              {filteredPlaces?.length > 0 ? (
                filteredPlaces.map((place: any) => (
                  <Combobox.Option
                    value={place}
                    key={place}
                    className="mb-5 font-Manrope border-b-2 border-b-light text-center cursor-pointer hover:border-b-black"
                  >
                    {place ? place : "No matches found"}
                  </Combobox.Option>
                ))
              ) : (
                <h1>No matches found</h1>
              )}
            </Combobox.Options>
          </Combobox>
        </div>
        {/*Reset filters button */}
        <h1
          className="font-Rubik font-semibold text-error underline cursor-pointer hover:-translate-y-1 hover:italic transition-transform"
          onClick={resetFilterOptions}
        >
          Reset filters
        </h1>
        {/*Apply button */}
        <CustomButton
          title="Apply"
          btnType="submit"
          styles="bg-primary text-lighter mt-5 font-Manrope hover:bg-primaryHover"
          handleClick={handleFilterOptions}
        />
      </div>
    </dialog>
  );
};

export default Modal;

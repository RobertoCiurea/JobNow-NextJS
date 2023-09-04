"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AddIconPrimary from "@/public/icons/addPrimary.svg";
//headless ui combobox
import { Combobox } from "@headlessui/react";
//ai generated places in the world
import { places } from "@/utilities/places";

const page = () => {
  type TagOptions = {
    id: String;
  };

  //modify the tagsArr length for each click of the button
  const [tagsArr, setTagsArr] = useState<TagOptions[]>([]);

  //querry the location states
  const [querry, setQuerry] = useState("");
  //next auth session
  const session = useSession();

  //combomox filtered items
  const filteredPlaces =
    querry === ""
      ? places
      : places.filter((place) => {
          return place.toLowerCase().includes(querry.toLowerCase());
        });

  //remove id object from the array on click
  function deleteTags(id: any): void {
    setTagsArr((currentTagsArr): any => {
      return currentTagsArr.filter((item) => {
        return item.id != id;
      });
    });
  }
  //add an id object in array onclick
  function addTags(e: any) {
    e.preventDefault();
    if (tagsArr.length < 4) {
      setTagsArr((currentTagsArr): any => [
        ...currentTagsArr,
        { id: crypto.randomUUID() },
      ]);
    }
    console.log(tagsArr);
  }

  //check if the user is logged in
  if (session && session?.data?.user) {
    return (
      //outer div
      <div className="flex flex-col justify-center items-center py-20 text-black relative">
        <h1 className="font-Manrope font-bold text-4xl py-10">
          Create your <span className="text-primary">ad</span>
        </h1>
        {/*Data form */}
        <form className="flex flex-col gap-20 md:flex-row md:gap-20 lg:gap-32 relative">
          {/*Left section */}
          <div className="flex flex-col gap-10">
            <h1 className="font-Rubik text-3xl font-bold">General</h1>
            <input
              type="text"
              name="title"
              placeholder="Add a title..."
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="number"
              name="salary"
              pattern="[0][0-9]"
              placeholder="Add a salary (in &euro;)"
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="text"
              name="owner"
              placeholder="Add your company name"
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <textarea
              name="description"
              cols={45}
              rows={10}
              placeholder="Add a description"
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            ></textarea>
          </div>
          {/*Right section */}
          <div className="flex flex-col gap-10">
            <h1 className="font-Rubik text-3xl font-bold">More</h1>
            <input
              type="email"
              name="title"
              placeholder="Add an email adress..."
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="number"
              name="title"
              placeholder="Add a phone number..."
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />

            {/*Combobox */}
            <Combobox>
              <Combobox.Input
                onChange={(e) => setQuerry(e.target.value)}
                placeholder="Select a location"
                className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
              />
              <Combobox.Options className="z-10 bg-lighter p-5 rounded-3xl grid sm:grid-cols-2 md:grid-cols-4 gap-5 ">
                {filteredPlaces?.length > 0 ? (
                  filteredPlaces.map((place: any) => (
                    <Combobox.Option
                      value={place}
                      key={place}
                      className="mb-5 font-Manrope border-b-2 border-b-light text-center cursor-pointer"
                    >
                      {place ? place : "No matches found"}
                    </Combobox.Option>
                  ))
                ) : (
                  <h1>No matches found</h1>
                )}
              </Combobox.Options>
            </Combobox>
            <input
              type="text"
              name="tag"
              placeholder="Add a tag"
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <div className="flex gap-10 flex-col">
              <div className="flex gap-20">
                <h1 className="font-Rubik text-xl">
                  Click here to ad more tags
                </h1>
                <Image
                  src={AddIconPrimary}
                  alt="Add more tags button"
                  width={38}
                  onClick={addTags}
                  className="cursor-pointer"
                />
              </div>
              {/*Add more input fields by the length of array "tagsArr" */}
              {tagsArr?.length > 0 &&
                tagsArr.map((item: any) => (
                  <div className="flex gap-5 justify-center text-black pl-12">
                    <input
                      type="text"
                      key={item.id}
                      name="tag"
                      placeholder=""
                      className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
                    />
                    <Image
                      src={AddIconPrimary}
                      alt="Delete button"
                      className="-rotate-45 cursor-pointer "
                      onClick={() => deleteTags(item.id)}
                    />
                  </div>
                ))}
              {tagsArr.length == 4 && (
                <h1 className="text-2xl text-error font-Rubik text-center">
                  You can't add more tags
                </h1>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center border-2 border-error p-5 m-20">
        <h1 className="font-Rubik text-4xl text-error">
          You don't have access here
        </h1>
      </div>
    );
  }
};

export default page;

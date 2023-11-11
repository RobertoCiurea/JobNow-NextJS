"use client";
import { useState, useContext } from "react";
import Image from "next/image";
//useSession from next auth
import { useSession } from "next-auth/react";
//icons
import AddIconPrimary from "@/public/icons/addPrimary.svg";
import { CustomButton } from "@/components/index";
//types
import { TagsContentTypes } from "@/types";
//the context from context provider

//headless ui combobox
import { Combobox } from "@headlessui/react";
//ai generated places in the world
import { places } from "@/utilities/places";

const ClientForm = ({
  sendDataToDatabase,
}: {
  sendDataToDatabase: (formdata: FormData, tags: String[]) => Promise<unknown>;
}) => {
  type TagIdOptions = {
    id: String;
  };
  // type TagContentOptions = {
  //   title: String;
  // };

  //modify the tagsLength length for each click of the button

  const [tags, setTags] = useState<any[]>([]);
  const [tagTitle, setTagTitle] = useState("");

  //

  //querry the location states
  const [querry, setQuerry] = useState("");
  //next auth session
  const session = useSession();
  const userEmail = session?.data?.user?.email;
  //combomox filtered items
  const filteredPlaces =
    querry === ""
      ? places
      : places.filter((place) => {
          return place.toLowerCase().includes(querry.toLowerCase());
        });

  //aremove the tag onclick
  function removeTags(id: TagIdOptions) {
    setTags((currentTags: any[]) => {
      return currentTags.filter((items): any => items.id != id);
    });
  }

  function changeTagsContent(e: any) {
    e.preventDefault();
    setTags((curentTags: TagsContentTypes[]) => {
      if (tagTitle === "" || tags.length >= 5) {
        return [...curentTags];
      } else {
        return [...curentTags, { id: crypto.randomUUID(), title: tagTitle }];
      }
    });
    setTagTitle("");
  }

  //remove tags from the tags array

  //check if the user is logged in
  if (session && session?.data?.user) {
    return (
      <form
        className="flex flex-col py-20 items-center flex-1"
        action={async (formData: FormData) => {
          try {
            await sendDataToDatabase(formData, tags);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {/*inner div */}
        <div className="flex flex-col gap-20 md:flex-row md:gap-20 lg:gap-32">
          {/*Left section */}
          <div className="flex flex-col gap-10">
            <h1 className="font-Rubik text-3xl font-bold">General</h1>
            <input
              type="text"
              name="title"
              placeholder="Add a title..."
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="number"
              name="salary"
              pattern="[0][0-9]"
              placeholder="Add a salary (in &euro;)"
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="text"
              name="company"
              placeholder="Add your company name"
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <textarea
              name="description"
              cols={45}
              rows={10}
              placeholder="Add a description"
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            ></textarea>
          </div>
          {/*Right section */}
          <div className="flex flex-col gap-10">
            <h1 className="font-Rubik text-3xl font-bold">More</h1>
            <input
              type="email"
              name="email"
              placeholder="Add an email adress..."
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="number"
              name="phone"
              placeholder="Add a phone number..."
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            {/*hidden input for sending session owner to /create-ad page */}
            <input
              type="text"
              name="owner"
              className="hidden"
              defaultValue={userEmail!}
            />

            {/*Combobox */}
            <Combobox>
              <Combobox.Input
                onChange={(e) => setQuerry(e.target.value)}
                name="location"
                placeholder="Select a location"
                required
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

            <div className="flex gap-10 flex-col">
              {/*Add tags by input*/}
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
                  value={tagTitle}
                  onChange={(e) => setTagTitle(e.target.value)}
                />
                <Image
                  src={AddIconPrimary}
                  alt="Add a tag button"
                  width={35}
                  className="cursor-pointer"
                  onClick={changeTagsContent}
                />
              </div>

              {tags.length == 5 && (
                <h1 className="text-2xl text-error font-Rubik text-center">
                  You can't add more tags
                </h1>
              )}
              <ul className="flex  flex-col items-center">
                {tags.length > 0 &&
                  tags.map((tag: any) => (
                    <li key={tag.id} className="flex gap-2 mb-5">
                      <span className="font-Rubik text-lg bg-light px-4 py-1 rounded-3xl">
                        #{tag.title}
                      </span>
                      <Image
                        src={AddIconPrimary}
                        alt="Delete tag button"
                        className="rotate-45 cursor-pointer"
                        onClick={() => removeTags(tag.id)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <CustomButton
          title="Submit"
          btnType="submit"
          styles="bg-primary text-background font-Rubik font-bold mt-20 text-2xl hover:bg-primaryHover"
        />
      </form>
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

export default ClientForm;

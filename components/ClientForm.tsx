"use client";
import { useState } from "react";
import Image from "next/image";
//useSession from next auth
import { useSession } from "next-auth/react";
//icons
import AddIconPrimary from "@/public/icons/addPrimary.svg";
import CheckIcon from "@/public/icons/check.svg";
import { CustomButton } from "@/components/index";

//headless ui combobox
import { Combobox } from "@headlessui/react";
//ai generated places in the world
import { places } from "@/utilities/places";

const ClientForm = ({
  sendDataToDatabase,
}: {
  sendDataToDatabase: (formdata: FormData, tags: string[]) => Promise<unknown>;
}) => {
  type TagIdOptions = {
    id: String;
  };
  // type TagContentOptions = {
  //   title: String;
  // };

  //modify the tagsLength length for each click of the button
  const [tagsLength, setTagsLength] = useState<TagIdOptions[]>([]);
  const [tagsContent, setTagsContent] = useState<any[]>([]);
  const [tagTitle, setTagTitle] = useState("");

  //

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
    setTagsLength((currentTagsLength): any => {
      return currentTagsLength.filter((item) => {
        return item.id != id;
      });
    });
  }
  //add an id object in array onclick
  function addTags(e: any) {
    e.preventDefault();
    if (tagsLength.length < 5) {
      setTagsLength((currentTagsLength): any => [
        ...currentTagsLength,
        { id: crypto.randomUUID() },
      ]);
    }
  }

  //add the title of each tag in tagsConent array
  function changeTagsContent() {
    setTagsContent((prevTagsConent) => {
      if (tagTitle === "") {
        return [...prevTagsConent];
      } else {
        return [...prevTagsConent, { title: tagTitle }];
      }
    });
  }
  //send tagsContent array to parent page

  //check if the user is logged in
  if (session && session?.data?.user) {
    return (
      <form
        className="flex flex-col py-20 items-center flex-1"
        action={async (formData: FormData, tagsContent: string[]) => {
          try {
            await sendDataToDatabase(formData, tagsContent);
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
              name="owner"
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
              name="title"
              placeholder="Add an email adress..."
              required
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            <input
              type="number"
              name="title"
              placeholder="Add a phone number..."
              className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
            />
            {/*hidden input for sending session owner to /create-ad page */}
            <input
              type="text"
              name="owner"
              className="hidden"
              defaultValue={session?.data?.user.name!}
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
              <div className="flex gap-20">
                <h1 className="font-Rubik text-xl">Click here to ad tags</h1>
                <Image
                  src={AddIconPrimary}
                  alt="Add more tags button"
                  width={38}
                  onClick={addTags}
                  className="cursor-pointer"
                />
              </div>
              {/*Add more input fields by the length of array "tagsLength" */}
              {tagsLength?.length > 0 &&
                tagsLength.map((item: any) => (
                  <div className="flex gap-5 justify-center text-black pl-12">
                    <input
                      type="text"
                      key={item.id}
                      name="tag"
                      onChange={(e) => setTagTitle(e.target.value)}
                      placeholder="Add a tag"
                      className="p-3 focus:outline-none  outline-none focus:border-2 focus:border-primary  bg-lighter rounded-xl font-Manrope shadow-xl"
                    />
                    {/* side buttons section */}
                    <Image
                      src={CheckIcon}
                      alt="Set Tag Button"
                      title="Set a tag on click"
                      onClick={changeTagsContent}
                      className="cursor-pointer"
                      width={32}
                    />
                    <Image
                      src={AddIconPrimary}
                      alt="Delete button"
                      title="Deelte tag input"
                      onClick={() => deleteTags(item.id)}
                      className="-rotate-45 cursor-pointer "
                    />
                  </div>
                ))}
              {tagsLength.length == 5 && (
                <h1 className="text-2xl text-error font-Rubik text-center">
                  You can't add more tags
                </h1>
              )}
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

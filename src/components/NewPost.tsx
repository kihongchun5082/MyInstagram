'use client'
import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FileIcon from "./ui/icons/FileIcon";
import Button from "./ui/Button";
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";

type Props = {
  me: AuthUser
}
export default function NewPost({me: {username, image}}: Props) {
  const [ dragging, setDragging ] = useState(false)
  const [ file, setFile ] = useState<File>()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState<string>()
  const textRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target?.files
    if (files && files[0]) {
      setFile(files[0])
      // console.log('NewPost_files[0];',files, files[0])
    }
  }
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true)
    } else if (e.type === 'dragleave') {
      setDragging(false)
    }
  }
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer?.files
    if (files && files[0]) {
      setFile(files[0])
      console.log('NewPost_files[0];',files, files[0])
    }
  }
  const handleSummit = (e: FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('text', textRef.current?.value ?? '')

    fetch('/api/posts', {method: 'POST', body: formData})
    .then(res => {
      if(!res.ok) {
        setError(`${res.status} ${res.statusText}`)
        return
      }
      router.push('/')
    }).catch(err => setError(err.toString()))
    .finally(()=>setLoading(false))
  }
  return (
    <section className=" w-full max-w-xl flex flex-col items-center py-2 mt-6 bg-green-500">
      {loading && (
        <div className=" absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20">
          <GridLoader />
        </div>
      )}
      {error && (
        <p className=" w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ''} />
      <form className=" w-full flex flex-col mt-2" onSubmit={handleSummit}>
        <input
          className=" hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full flex flex-col justify-center items-center bg-slate-400 ${
            !file && ' border-2 border-dashed border-sky-500'
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          {dragging && (
            <div className=" absolute inset-0 z-20 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className=" flex flex-col items-center pointer-events-none">
              <FileIcon />
              <p>사진을 등록하시려면 드래그 하거나 파일을 클릭하세요</p>
            </div>
          )}
          {file && (
            <div className=" relative w-full aspect-square">
              <Image
                className=" object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className=" outline-none text-lg border border-neutral-300 bg-lime-50"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={'사진에 대한 간단한 설명'}
          ref={textRef}
        />
        <Button text="등록하기" onClick={() => {}} />
      </form>
    </section>
  );
}


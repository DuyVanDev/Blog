"use client";
import axios from "axios";
import React, { useContext,useState } from "react";
import Link from "next/link";
import { Toaster } from "sonner";
import { Button, Divider, Inputbox, Logo } from "@/components";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiImages } from "react-icons/bi";


const Register = () => {
  const [showForm, setShowForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5167/api/Auth/Register", {
        username,
        password,
      });
      if (res.status == 200) {
        setMessage("Đăng ký thành công");

      }
    } catch (err) {
      setMessage("Đã có lỗi")
      throw new Error(err);
    }
  };
  return (
    <div className='flex w-full h-[100vh]'>
      {/* LEFT */}
      <div className='hidden md:flex flex-col gap-y-4 w-1/3 h-full bg-black items-center justify-center'>
        {/* {fileURL && (
          <img
            src={fileURL || file}
            alt=''
            className='w-16 h-16 rounded-full'
          />
        )} */}
        <Logo type='sigin' />
        <span className='text-xl font-semibold text-white'>Welcome!</span>
      </div>

      {/* RIGHT */}
      <div className='flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-4 md:px-20 lg:px-40'>
        <div className='w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8'>
          <div className='block mb-10 md:hidden -ml-8'>
            <Logo />
          </div>

          <div className='w-full space-y-6 flex flex-col justify-start'>
            <div className='max-w-md w-full flex gap-3 md:gap-4 items-center justify-center mb-12'>
              {showForm && (
                <IoArrowBackCircleSharp
                  className='text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400'
                  onClick={() => setShowForm(false)}
                />
              )}
              <h2 className='text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white'>
                Sign up for an account
              </h2>
            </div>
            {showForm ? (
              <form
                className='max-w-md w-full mt-8 space-y-6 '
              >
                <div className='flex flex-col rounded-md shadow-sm -space-y-px gap-6 mb-8'>
                  <div className='w-full flex gap-4'>
                    <Inputbox
                      label='First Name'
                      name='firstName'
                      type='text'
                      isRequired={true}
                      placeholder='First Name'
                    />
                    <Inputbox
                      label=' Last Name'
                      name='lastName'
                      type='text'
                      isRequired={true}
                      placeholder='First Name'
                    />
                  </div>

                  <Inputbox
                    label='Email Address'
                    name='email'
                    type='email'
                    isRequired={true}
                    placeholder='email@example.com'
                  />
                  <Inputbox
                    label='Password'
                    name='password'
                    type='password'
                    isRequired={true}
                    placeholder='Password'
                  />

                  <div className='flex items-center justify-between py-4'>
                    <label
                      className='flex items-center gap-1 text-base text-black dark:text-gray-500 cursor-pointer'
                      htmlFor='imgUpload'
                    >
                      <input
                        type='file'
                        className='hidden'
                        id='imgUpload'
                        data-max-size='5120'
                        accept='.jpg, .png, .jpeg'
                      />
                      <BiImages />
                      <span>Picture</span>
                    </label>
                  </div>
                </div>

                <Button
                  label='Create Account'
                  type='submit'
                  styles='group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 '
                />
              </form>
            ) : (
              <>
                <div className='max-w-md w-full space-y-8'>
                  <Button
                    // onClick={() => googleLogin()}
                    label='Sign up with Google'
                    icon={<FcGoogle className='text-xl' />}
                    styles='w-full flex flex-row-reverse gap-4 bg-black dark:bg-transparent dark:border text-white px-5 py-2.5 rounded-full'
                  />
                  <Divider label='OR' />

                  <Button
                    onClick={() => setShowForm(true)}
                    label='Continue with email'
                    styles='w-full gap-4 bg-white text-black dark:bg-rose-800 dark:text-white px-5 py-2.5 rounded-full border dark:border-none border-gray-300'
                  />
                </div>
              </>
            )}

            <p className='max-w-md w-full text-center text-gray-600 dark:text-gray-300'>
              Already has an account?{" "}
              <Link href='/sign-in' className='text-rose-800 font-medium'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster richColors />
    </div>
    // <Grid container component="main" sx={{ height: "100vh" }}>
    //   <CssBaseline />
    //   <Grid
    //     item
    //     xs={false}
    //     sm={4}
    //     md={7}
    //     sx={{
    //       backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
    //       backgroundRepeat: "no-repeat",
    //       backgroundColor: (t) =>
    //         t.palette.mode === "light"
    //           ? t.palette.grey[50]
    //           : t.palette.grey[900],
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //     }}
    //   />
    //   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //     <Box
    //       sx={{
    //         my: 8,
    //         mx: 4,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //       Đăng Ký
    //       </Typography>
    //       <Box component="form" onSubmit={handleClick}  noValidate sx={{ mt: 1 }}>
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="username"
    //           label="Username"
    //           name="username"
    //           autoComplete="Username"
    //           autoFocus
    //           value={username}
    //           onChange={e => (setUsername(e.target.value))}
    //         />
            
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //           value={password} onChange={e => (setPassword(e.target.value))}
    //         />
    //         {message && <div>{message}</div>}
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Đăng Ký
    //         </Button>
    //         <Grid container>
              
    //           <Grid item>
    //             <Link href="/dashboard/login">
    //               <Typography
    //                 variant="body2"
    //                 sx={{ textDecoration: "underline", color: "blue" }}
    //               >
    //                 {"Đã có tài khoản"}
    //               </Typography>
    //             </Link>
    //           </Grid>
    //         </Grid>
    //         {/* <Copyright sx={{ mt: 5 }} /> */}
    //       </Box>
    //     </Box>
    //   </Grid>
    // </Grid>



    //   <div>
    //   <form className='form' action="">
    //     <input type="text" placeholder="Username" value={username} required onChange={e => (setUsername(e.target.value))}/>
    //     <input type="text" placeholder="Email" value={email} required  onChange={e => (setEmail(e.target.value))}/>
    //     <input type="password" placeholder="Password" required value={password} onChange={e => (setPassword(e.target.value))}/>
    //     <button onClick={handleClick}>Dang ky</button>
    //     {message && <div>{message}</div>}
    //   </form>
    // </div>
  );
};

export default Register;

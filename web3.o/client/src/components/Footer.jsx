import logo from '../../images/logo.png';
const Fotter = () => {
    return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
                <div>
                    <img src={logo} alt="logo" className='w-32' />
                </div>
                <div className='flex flex-1 justify-evenely'>

                </div>

            </div>

        </div>
    );
}
export default Fotter;
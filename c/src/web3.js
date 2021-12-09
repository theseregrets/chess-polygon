async function fetchGreeting () {
    if ( typeof window.ethereum !== 'undefined' ) {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const contract = new ethers.Contract( greeterAddress, Greeter.abi, provider );

        try {
            const data = await contract.greet();
            console.log( data );
        } catch ( err ) {
            console.log( err );
        }
    } else {
        alert( 'Please install MetaMask' );
    }
}

async function setGreeting () {
    if ( !greeting ) {
        return;
    }
    if ( typeof window.ethereum !== 'undefined' ) {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const contract = new ethers.Contract( greeterAddress, Greeter.abi, signer );
        const transaction = await contract.setGreeting( greeting );
        setGreetingValue( '' );
        await transaction.wait();
        fetchGreeting();
    }
}
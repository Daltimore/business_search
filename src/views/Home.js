/* eslint-disable array-callback-return */
import React from 'react';
// import {Loader, LoaderOptions} from 'google-maps';
class Home extends React.Component {
  state = {
    input: "",
    fData: [
      {
        business_name: "Araknet",
        type: "Technology",
        geo_location: "jaynewashington@exposa.com",
        description: "female"
      },
      {
        business_name: "Google",
        type: "Technology",
        geo_location: "petersondalton@exposa.com",
        description: "male"
      },
      {
        business_name: "Paystack",
        type: "Fintech",
        geo_location: "velazquezcalderon@exposa.com",
        description: "male"
      },
      {
        business_name: "Stripe",
        type: "Fintech",
        geo_location: "normanreed@exposa.com",
        description: "male"
      }
    ],
    data: [
      {
        business_name: "Araknet",
        type: "Technology",
        geo_location: "jaynewashington@exposa.com",
        description: "female"
      },
      {
        business_name: "Google",
        type: "Technology",
        geo_location: "petersondalton@exposa.com",
        description: "male"
      },
      {
        business_name: "Paystack",
        type: "Fintech",
        geo_location: "velazquezcalderon@exposa.com",
        description: "male"
      },
      {
        business_name: "Stripe",
        type: "Fintech",
        geo_location: "normanreed@exposa.com",
        description: "male"
      }
    ]
  };


  handleChange = event => {
    this.setState({
      input: event.target.value
    }, this.filterHandler);
  };

  handleClick = async() => {
    // console.log('Click happened');
    // const options = {}
    // const loader = new Loader('AIzaSyBLTL8haBZZ-GYvhuK5jcZDOibk_o9Bu74', options);
    // const google = await loader.load();

    // const map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8,
    // });
    // return map
    const address = '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA'
    const response = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBLTL8haBZZ-GYvhuK5jcZDOibk_o9Bu74`

    fetch(response)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })

    console.log(response);
  }


  highlighter = (obj, lowercasedInput) => {
    let rawObj = obj.replace(`<span className='highlight'>`, '').replace(`</span>`, '');

    if (rawObj.indexOf(lowercasedInput) !== -1) {
      const startIndex = rawObj.indexOf(lowercasedInput);
      const endIndex = startIndex - 1 + lowercasedInput.length;

      if (startIndex !== 0) {
        return rawObj.slice(0, startIndex) + `<span className='highlight'>${lowercasedInput}</span>` + rawObj.slice(endIndex + 1, rawObj.length);
      } else {
        return rawObj.slice(0, startIndex) + `<span className='highlight'>${lowercasedInput}</span>` + rawObj.slice(endIndex + 1, rawObj.length);
      }
    } else {
      return rawObj
    }
  }


  filterHandler = () => {
    const {
      input,
      data
    } = this.state;
    const lowercasedInput = input.toLowerCase();

    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedInput)
      );
    });

    let highlightFD = [];
    filteredData.map((values, index) => {
      highlightFD.push({ ...values
      });
    })


    if (lowercasedInput.trim().length > 0) {
      highlightFD.map((val, index) => {
        for (let key in val) {
          highlightFD[index][key] = this.highlighter(val[key].toLowerCase(), lowercasedInput);
        }
      });
    }

    this.setState({
      fData: highlightFD
    });

  }

  render() {
    const {
      input,
      fData
    } = this.state;


    return ( 
      <div className="min-h-screen h-full flex justify-center items-center">
        <div className="w-6/12">
        <h3 className="font-semibold text-3xl pb-6">Business Search</h3>
        <div className="border border-gray-300 rounded-md p-8 mb-10">
        <
          input
            value = { input }
            onChange = { this.handleChange }
            className="px-5 py-3 w-full border border-gray-400 rounded-xl mb-8 focus:outline-none"
            type="text"
            placeholder="Type to search..."
          /> {
        fData.map((item, index) => ( <div key ={index} className ="flex mt-2">
         <div
          className="cursor-pointer"
          onClick={() => this.handleClick()}
        >
          {item.business_name}
        </div>
        </div>
        ))}
        </div>
        <div id="map"></div>
      </div>
      </div>
  );
}
}

export default Home;
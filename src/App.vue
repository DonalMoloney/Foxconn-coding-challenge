<template>
  <div>
    <div id="app_title_div">
      <img
        id="app_title_img"
        src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Foxconn_logo.svg"
      />
      <h1 id="app_title_header">Milwaukee Brewery Coding Challenge</h1>
    </div>
    <div id="card">
      <div>
        <div>
          <table id="options_table">
            <thead>
              <th id="display_options_title_header">
                Display Selected Options
              </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="id"
                    v-model="checkedOptions"
                    value="id"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Id</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="name"
                    v-model="checkedOptions"
                    value="name"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Name</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="brewery_type"
                    v-model="checkedOptions"
                    value="brewery_type"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Brewery Type</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="street"
                    v-model="checkedOptions"
                    value="street"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Street</label>
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="address"
                    v-model="checkedOptions"
                    value="address"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Address</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="longitude"
                    v-model="checkedOptions"
                    value="longitude"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Longitude</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="latitude"
                    v-model="checkedOptions"
                    value="latitude"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Latitude</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="phone"
                    v-model="checkedOptions"
                    value="phone"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Phone</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="website_url"
                    v-model="checkedOptions"
                    value="website_url"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Website</label>
                </td>

                <td>
                  <input
                    type="checkbox"
                    id="postal_code"
                    v-model="checkedOptions"
                    value="postal_code"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Postal Code</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="updated_at"
                    v-model="checkedOptions"
                    value="updated_at"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Updated At</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="created_at"
                    v-model="checkedOptions"
                    value="created_at"
                    v-on:change="getUpdatedData()"
                  />
                  <label for="checkbox">Created At</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table id="secondary_options_list">
          <thead id="secondary_options_list_header">
            Secondary Options
          </thead>
          <tr v-if="checkedOptions.includes('brewery_type')">
            <td><label>Brewery Type:</label></td>
            <td>
              <select
                v-model="selected_brewery_type"
                class="form-control"
                @change="getSecondaryParsedData"
              >
                <option :selected="selected_brewery_type == all_brewery_type" value="all_brewery_type">all brewery types</option>
                <option
                  v-for="brewery_type in unique_brewery_array"
                  :key="brewery_type"
                  :selected="selected_brewery_type == brewery_type"
                >
                  {{ brewery_type }}
                </option>
              </select>
            </td>
          </tr>
          <tr v-if="checkedOptions.includes('phone')">
            <td><label>Area Code:</label></td>
            <td>
              <select
                v-model="selected_area_code"
                class="form-control"
                @change="getSecondaryParsedData"
              >
                <option value="all_area_code">all postal codes</option>
                <option
                  v-for="area_code in unique_area_codes_array"
                  :key="area_code"
                >
                  {{ area_code }}
                </option>
              </select>
            </td>
          </tr>
          <tr v-if="checkedOptions.includes('postal_code')">
            <td><label>Postal Code:</label></td>
            <td>
              <select
                v-model="selected_postal_code"
                class="form-control"
                @change="getSecondaryParsedData"
              >
                <option value="all_postal_code">all postal codes</option>
                <option
                  v-for="postal_code in unique_postal_codes_array"
                  :key="postal_code"
                >
                  {{ postal_code }}
                </option>
              </select>
            </td>
          </tr>
        </table>
        <div id="reset_query_button_div">
          <button id="reset_query_button" @click="handleResetClick">
            Reset Query
          </button>
        </div>
      </div>
      <div>
        <h1 id="brewery_data_table_options_title_header">
          Parsed Display Table
        </h1>
        <table id="brewery_data_table">
          <thead>
            <th v-for="columns in checkedOptions" :key="columns">
              {{ columns }}
            </th>
          </thead>
          <tbody>
            <tr v-for="brewery in breweries_current_data" :key="brewery.id">
              <td v-for="item in brewery" v-bind:key="item">{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "App",
  setup() {
    const breweries_original_data = ref(null);
    let breweries_current_data = ref(null);
    let selected_brewery_type = ref(null);
    let selected_postal_code = ref(null);
    let selected_area_code = ref(null);
    let checkedOptions = ref([
      "name",
      "brewery_type",
      "street",
      "phone",
      "postal_code",
    ]); //Default selected options
    let unique_brewery_array = ref([]);
    let unique_area_codes_array = ref([]);
    let unique_postal_codes_array = ref(null);

    function getInitialData() {
      fetch("https://api.openbrewerydb.org/breweries?by_city=milwaukee", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          breweries_original_data.value = response;
          getUpdatedData();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    function handleResetClick() {
      getUpdatedData();
      selected_brewery_type.value = null;
      selected_postal_code.value = null;
      selected_area_code.value = null;
    }
    function getUpdatedData() {
      // Always use the original data to get a fresh array of objects to parse
      const res = breweries_original_data.value.map((data) =>
        checkedOptions.value.reduce((o, k) => ((o[k] = data[k]), o), {})
      ); //Removes unselected data from each object
      if(checkedOptions.value.includes('brewery_type')){ // if brewery_type is in checked options find values for drop down
        getBreweryTypes(res); // Find Unique Values in Array
      }
      if(checkedOptions.value.includes('postal_code')){ // if postal_code is in checked options find values for drop down
        getPostalCodes(res);
      }
      if(checkedOptions.value.includes('phone')){ // if phone is in checked options find values for drop down
        getAreaCodes(res);
      }
      breweries_current_data.value = res;
    }

    function getAreaCodes(parsedBreweres) {
      let area_codes_not_null = parsedBreweres.filter(function (brewery) { //first filter out any rows that are missing phone numbers
        return brewery.phone !== null;
      });
      // below save the first 3 digits of unique values
      unique_area_codes_array.value = [
        ...new Map(
          area_codes_not_null.map((item) => [
            item["phone"].substring(0, 3),
            item["phone"].substring(0, 3),
          ])
        ).values(),
      ]; //Creating a mapping that only keeps unqiue postal code
    }
    function getPostalCodes(parsedBreweres) {
      unique_postal_codes_array.value = [
        ...new Map(
          parsedBreweres.map((item) => [
            item["postal_code"].substring(0, 5),
            item["postal_code"].substring(0, 5),
          ])
        ).values(),
      ]; //Creating a mapping that only keeps unqiue postal code
    }
    function getBreweryTypes(parsedBreweres) {
      unique_brewery_array.value = [
        ...new Map(
          parsedBreweres.map((item) => [
            item["brewery_type"],
            item["brewery_type"],
          ])
        ).values(),
      ]; //Creating a mapping that only keeps unqiue brewery types
    }

    function getParsedBreweryType() {
      let parsed_brewery_type = breweries_current_data.value.filter(function (
        brewery
      ) {
        return brewery.brewery_type === selected_brewery_type.value;
      });
      breweries_current_data.value = parsed_brewery_type;
    }

    function getValidAreaCodes(item_to_parse) {
      return item_to_parse.value.filter(function (brewery) {
        return brewery.phone !== null;
      });
    }

    function getParsedAreaCode() {
      let area_codes_not_null = getValidAreaCodes(breweries_current_data);
      let parsed_brewery_area_code = area_codes_not_null.filter(function (
        brewery
      ) {
        return brewery.phone.includes(selected_area_code.value);
      });
      breweries_current_data.value = parsed_brewery_area_code;
    }

    function getParsedPostalCodeType() {
      let parsed_brewery_postal_code = breweries_current_data.value.filter(
        function (brewery) {
          return brewery.postal_code.includes(selected_postal_code.value);
        }
      );
      breweries_current_data.value = parsed_brewery_postal_code;
    }

    function getSecondaryParsedData() {
      getUpdatedData();
      // On start value is null or if selected will be all postal codes / all brewery types / all area codes.
      // If either of those two don't do anything because we dont want to parse any of those values
      if (selected_brewery_type.value !== null && !selected_brewery_type.value.includes("all")) { //if selected value is not null or includes all, other words if user has selected specific values to display
        getParsedBreweryType();
      }
      if (selected_postal_code.value !== null && !selected_postal_code.value.includes("all")) { //if selected value is not null or includes all, other words if user has selected specific values to display
        getParsedPostalCodeType();
      }
      if (selected_area_code.value !== null && !selected_area_code.value.includes("all")) { //if selected value is not null or includes all, other words if user has selected specific values to display
        getParsedAreaCode();
      }
    }
    onMounted(() => {
      getInitialData();
    });
    return {
      breweries_current_data,
      breweries_original_data,
      checkedOptions,
      getUpdatedData,
      getInitialData,
      getValidAreaCodes,
      handleResetClick,
      unique_brewery_array,
      unique_postal_codes_array,
      unique_area_codes_array,
      getParsedPostalCodeType,
      getParsedBreweryType,
      getParsedAreaCode,
      selected_brewery_type,
      selected_postal_code,
      selected_area_code,
      getSecondaryParsedData,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
#app_title_img {
  max-width: 100%;
  height: auto;
}

#app_title_header {
  font-size: 25pt;
}

#display_options_title_header {
  font-size: 18pt;
}
#reset_query_button_div {
  display: flex;
  justify-content: flex-end;
}
#reset_query_button {
  padding: 15px 25px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: rgb(255, 0, 0);
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  display: flex;
  justify-content: flex-end;
}

#reset_query_button:hover {
  background-color: rgb(163, 4, 4);
}
#reset_query_button:active {
  background-color: rgb(255, 49, 46);
  box-shadow: 0 5px rgb(51, 49, 56);
  transform: translateY(4px);
}

#card {
  border-radius: 25px;
  background: #2954c9;
  padding: 20px;
  width: auto;
  height: auto;
}

#secondary_options_list {
  padding: 20pt;
  width: 50%;
}

#secondary_options_list label {
  font-size: 14;
}

#secondary_options_list #secondary_options_list_header {
  font-size: 18;
  font-weight: bold;
}

#app_title_div {
  color: rgb(0, 49, 120);
  text-align: center;
}
#brewery_data_table_options_title_header {
  font-size: 18pt;
}
#brewery_data_table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background: #d3d3d3;
}

#brewery_data_table td,
#brewery_data_table th {
  border: 1px solid silver;
  padding: 8px;
}
#brewery_data_table tr:nth-child(even) {
  background-color: #a9a9a9;
}

#brewery_data_table tr:hover {
  background-color: #f5f5f5;
}
#brewery_data_table th {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  background-color: #2c3e50;
  color: White;
}

#options_table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#options_table td {
  border: 1px solid silver;
  background-color: #a9a9a9;

  padding: 8px;
  text-align: left;
}

#options_table td:hover {
  background-color: #f5f5f5;
}
#options_table th {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
  color: Black;
}
</style>

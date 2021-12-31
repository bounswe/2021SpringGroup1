import React, { useState, useEffect, } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import "@reach/combobox/styles.css";


var address = "";
const libraries = ["places"];
const mapContainerStyle = {
    height: "400px",
};
// istanbul is the center
const center = {
    lat: 41.015137,
    lng: 28.979530,
};

function MapGoogle(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBZng78Z9fLu_MEVS2ckEU5PBOK7HYcJcs",
        libraries,
    });
    const [markers, setMarkers] = React.useState([{
        lat: "",
        lng: "",
        time: new Date(),
    }]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        markers[0]["lat"] = e.latLng.lat();
        markers[0]["lng"] = e.latLng.lng();
        setMarkers([
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
        console.log(markers);
        const KEY = "AIzaSyBZng78Z9fLu_MEVS2ckEU5PBOK7HYcJcs";
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${markers[0]["lat"]},${markers[0]["lng"]}&key=${KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                address = data.results[0].formatted_address;
                console.log("address: ", address);
            })
    }, []);
    props.getLocationData(markers[0],address);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default MapGoogle;
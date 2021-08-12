import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon } from '@react-google-maps/api';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

import "@reach/combobox/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setlocation } from '../../store/actions/offerActions';
import { coordinates } from '../../store/types';
import classes from './useMap.module.scss';
import { v4 as uuidv4 } from 'uuid';

//const libraries = ['places'];
interface Props {
    cname: string
}

function useMap<Props>(cname?: string, loc?: any) {
    const [marker, setMarker] = useState<coordinates>();
    const [selected, setSelected] = useState<coordinates>();
    const dispatch = useDispatch();
    const { location } = useSelector((state: RootState) => state.offers)
    const [libraries, setLibraries] = useState(['places'])

    useEffect(() => {
        setMarker(location)
    }, [location])

    const mapRef = useRef();

    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map;
        }, [],
    )

    //zone.setMap(map),

    const onMapClick = useCallback((e) => {
        if (cname == "view") {
            return
        } else {
            dispatch(setlocation({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            }))
            setMarker({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })
        }
    }, [])

    let mapContainerStyle: any;
    {
        cname == "view" ?
        mapContainerStyle = {
            width: "100%",
            height: "100%",
        }
        :
        mapContainerStyle = {
            width: "100%",
            height: "100%",
        };
    }

    let center: any;
    {
        cname == "view" ?
        center = loc
        :
        center = {
            lat: 50.721680,
            lng: -1.878530,
        }
    }

    const rectangleCoords = [
        { lat: 50.745146, lng: -1.996178 },
        { lat: 50.746884, lng: -1.865334 },
        { lat: 50.728469, lng: -1.796042 },
        { lat: 50.719178, lng: -1.797164 },
        { lat: 50.719830, lng: -1.833541 },

        { lat: 50.715809, lng: -1.875242 },
        { lat: 50.704857, lng: -1.911450 },
        { lat: 50.682320, lng: -1.946397 },
        { lat: 50.686344, lng: -1.953014 },

        { lat: 50.698958, lng: -1.933431},
        { lat: 50.712113, lng: -1.966554 },
        { lat: 50.707112, lng: -1.988346 },

        { lat: 50.712113, lng: -2.023865 },
    ];

    const everythingElse = [
        { lat: 0, lng: -90 },
        { lat: 0, lng: 90 },
        { lat: 90, lng: -90 },
        { lat: 90, lng: 90 },
    ];

    // Construct the polygon.
    const zone = new google.maps.Polygon({
        paths: [rectangleCoords, everythingElse],
        strokeColor: "#d97171",
        strokeOpacity: -1,
        strokeWeight: -1,
        fillColor: "#d97171",
        fillOpacity: .3,
        clickable: true
    });

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,

    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <div className={cname == "view" ? classes.view : classes.Map}>
            {cname == "view" ?
                null
                :
                <Fragment>
                    <h6>Please click on the map to set property location</h6>
                    <Search />
                    <Locate />
                </Fragment>
            }
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={cname == "view" ? 14 : 11}
                center={center}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {cname == "view" ?
                    marker ?
                        <Marker
                            key={new Date().toString()}
                            position={loc}
                        />
                        :
                        null

                    :
                    marker ?
                        <Marker
                            key={new Date().toString()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setSelected(marker)
                            }}
                        />
                        :
                        null

                }
                <Polygon paths={[rectangleCoords, everythingElse]} options={{
                    strokeColor: "#d97171",
                    strokeOpacity: -1,
                    strokeWeight: -1,
                    fillColor: "#d97171",
                    fillOpacity: .3,
                    clickable: true
                }} />
                {selected ? (<InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                        setSelected(undefined);
                    }}
                >
                    <div>
                        <h4>Property location</h4>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    );
}

export default useMap;

function Locate() {
    const dispatch = useDispatch();
    return (
        <button className={classes['my-position']} onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = { lat: position.coords.latitude, lng: position.coords.longitude }
                dispatch(setlocation(coords));
            }, () => null);
        }}>
            <span className="material-icons md-36">
                my_location
            </span>
        </button>
    )
}

function Search() {
    const dispatch = useDispatch();
    const loc = new google.maps.LatLng(50.721680, -1.878530, true);
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: loc,
            radius: 1 * 1000,
        }
    });

    return <div className={classes['address-search']}>
        <Combobox onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
                const result = await getGeocode({ address });
                const coords = await getLatLng(result[0]);
                dispatch(setlocation(coords))
            } catch (e) {

            }
        }}>
            <ComboboxInput value={value} onChange={(e) => {
                setValue(e.target.value)
            }}
                disabled={!ready}
                placeholder="Enter an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={uuidv4()} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </div>
}
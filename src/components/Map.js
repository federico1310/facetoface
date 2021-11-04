import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, OverlayView  } from '@react-google-maps/api';
import styles from '../styles/MapList.module.css';
import { Slide } from 'react-slideshow-image';
import Link from 'next/link';
import Image from 'next/image';

const Map = props => {

  const [selectedPrice, setSelectedPrice] = useState();
  useEffect(() => {
    if(typeof props.markedProp != 'undefined')
    {
      var mapPrices = document.getElementsByClassName('mapPriceItem');
      for(var i = 0; i < mapPrices.length; i++)
      {
        if(!mapPrices[i].classList.contains('selected'))
          mapPrices[i].parentElement.style.zIndex = 1;
      } 
      if(props.markedProp > 0)
      {
        let elem = document.getElementById('mapPriceItem_'+props.markedProp);
        if(elem)
        {
          let elemContainer = document.getElementById('mapPriceItem_'+props.markedProp).parentElement;
              elemContainer.style.zIndex = 100;
        }
      }
    }
  }, [props.markedProp])

  const position = {
    lng: props.longitude,
    lat: props.latitude
  }
  const containerStyles = {
    width: '100%', 
    height: '100%'
  }

  const selectedStyles = {
    zIndex: 100
  }

  const options = { closeBoxURL: '', enableEventPropagation: true };

  const parseaObjLatLng = function(coordinates) {
    let obj = {}
        obj.lat = coordinates.latitude;
        obj.lng = coordinates.longitude;
    return obj;
  }

  const priceClickHandler = function(id, e) {
    e.stopPropagation();
    setSelectedPrice(id)
    var mapPrices = document.getElementsByClassName('mapPriceItem');
    for(var i = 0; i < mapPrices.length; i++)
    {
      mapPrices[i].parentElement.style.zIndex = 1;
    } 

    var mapPropertyList = document.getElementById('mapPropertyList');
    var cardContainer = document.getElementById('mapPriceItem_'+id).parentElement;
    var infoCardContainer = document.getElementById('infoCardContainer_'+id);
    
    var verified = verifyEmptySpaceModal(infoCardContainer,mapPropertyList)

    if(!verified.valid)
    {
          infoCardContainer.style.transform = "translate(calc(-50% + "+verified.fixH+"), calc(50% + "+verified.fixV+"))";
    }
    cardContainer.style.zIndex = 100;
  }
  const mapClickHandler = function(e) {
    setSelectedPrice()
    var mapPrices = document.getElementsByClassName('mapPriceItem');
    for(var i = 0; i < mapPrices.length; i++)
    {
      if(!mapPrices[i].classList.contains('selected'))
          mapPrices[i].parentElement.style.zIndex = 1;
    } 
  }

  const verifyEmptySpaceModal = function(card, parent) {

    let cardRect = card.getBoundingClientRect();
    let parentRect = parent.getBoundingClientRect();

    var left = cardRect.left - 50;
    var t = cardRect.top - 50;
    var right = left+cardRect.width;
    var bottom = t+cardRect.height;

    var pleft = parentRect.left;
    var ptop = parentRect.top;
    var pright = pleft+parentRect.width - 50;
    var pbottom = ptop+parentRect.height - 50;

    let response = {}
        response.valid = true;
    if(left < pleft)
    {
      if(t < ptop)
      {
        response.quadrant = 1;
        response.valid = false;
      }
      else if(bottom > pbottom)
      {
        response.quadrant = 3;
        response.valid = false;
      }
      else
      {
        response.quadrant = 5;
        response.valid = false;
      }
    }
    else if(right > pright)
    {
      if(t < ptop)
      {
        response.quadrant = 2;
        response.valid = false;
      }
      else if(bottom > pbottom)
      {
        response.quadrant = 4;
        response.valid = false;
      }
      else
      {
        response.quadrant = 6;
        response.valid = false;
      }
    }
    else if(t < ptop)
    {
      response.quadrant = 7;
      response.valid = false;
    }
    else if(bottom > pbottom)
    {
      response.quadrant = 8;
      response.valid = false;
    }

    switch(response.quadrant)
    {
      case 1:
        response.fixV = '180.906px';
        response.fixH = '175.279px';
      break;
      case 2:
        response.fixV = '180.906px';
        response.fixH = '-175.279px';
      break;
      case 3:
        response.fixV = '-190.906px';
        response.fixH = '175.279px';
      break;
      case 4:
        response.fixV = '-190.906px';
        response.fixH = '175.279px';
      break;
      case 5:
        response.fixV = '0px';
        response.fixH = '175.279px';
      break;
      case 6:
        response.fixV = '0px';
        response.fixH = '-175.279px';
      break;
      case 7:
        response.fixV = '180.906px';
        response.fixH = '0px';
      break;
      case 8:
        response.fixV = '-190.906px';
        response.fixH = '0px';
      break;
    }
    return response;   
  }

  const mouseEnterLeaveEvents = function(id, e) {
    if(selectedPrice != id)
    {
      var mapPrices = document.getElementsByClassName('mapPriceItem');
      for(var i = 0; i < mapPrices.length; i++)
      {
        if(!mapPrices[i].classList.contains('selected'))
          mapPrices[i].parentElement.style.zIndex = 1;
      } 
      let elemContainer = document.getElementById('mapPriceItem_'+id).parentElement;
      if(e.type == "mouseenter")
      {
        elemContainer.style.zIndex = 99;
      }
    }
  }
  return (
      <LoadScript googleMapsApiKey="AIzaSyDNnl7-Ma9nGsySKzMyKJ8pkXRVBfqAqDs">
        <GoogleMap
          mapContainerStyle={props.containerStyles ? props.containerStyles : containerStyles}
          center={position}
          zoom={props.zoom ? props.zoom : 6}
          onClick={mapClickHandler}
        >
          {props.data.map( propiedad => (

              <OverlayView
                key={propiedad.id}
                options={options}
                position={parseaObjLatLng(propiedad.coordinates)}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div onMouseEnter={(e) => mouseEnterLeaveEvents(propiedad.id, e)} onMouseLeave={(e) => mouseEnterLeaveEvents(propiedad.id, e)} onClick={(e) => priceClickHandler(propiedad.id, e)} id={`mapPriceItem_${propiedad.id}`} className={`${styles.priceMarkerContainer} ${propiedad.id == selectedPrice ? styles.isSelected+' selected' : ''} ${propiedad.id == props.markedProp ? styles.isHovered+' selected' : ''} mapPriceItem`}>
                  <div className={styles.priceMarker}>
                    ${propiedad.price}
                  </div>
                  <div id={`infoCardContainer_${propiedad.id}`} className={styles.priceCardContainer}>
                    <div className={styles.infoCardHalf}>
                      <Slide easing="ease" cssClass={styles.sliderWrapper} autoplay={false} indicators={true}>
                          {propiedad.thumbnails.map( thumbnail => (
                            <div className={styles.slide} key={thumbnail.id}>
                              <Image src={thumbnail.path} height={thumbnail.original_height} width={thumbnail.original_width} layout="intrinsic" className={styles.infoPropertyCardImage}/>
                            </div>
                          ))}
                      </Slide>
                    </div>
                    <Link href={`/propiedad-display?id=${propiedad.id}`}>
                      <a className={styles.infoCardHalf}>
                        <div className={styles.realInfoCardPropertyName}>{propiedad.real_property_name}</div>
                        <div className={styles.fakeInfoCardPropertyName}>{propiedad.fake_property_name}</div>
                        <div className={styles.priceInfoContainerCardProperty}>
                            <div className={styles.priceInfoCardProperty}>${propiedad.price}</div><div className={styles.priceInfoPerCardProperty}>/ {propiedad.per}</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>

              </OverlayView>
          ))}
        </GoogleMap>
      </LoadScript>
  )
}

export default Map;
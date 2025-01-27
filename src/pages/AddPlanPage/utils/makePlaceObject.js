const makePlaceObject = item => ({
  place_name: item?.title?.length > 20 ? `${item.title.slice(0, 20)}...` : item.title,
  description: item?.introduction,
  category: item?.contentscd?.label,
  road_address: item?.roadaddress,
  lat: item?.latitude,
  lng: item?.longitude,
  content_id: item?.contentsid,
});
export default makePlaceObject;

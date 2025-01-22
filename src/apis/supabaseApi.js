import { createClient } from '@supabase/supabase-js';
import { formatDate } from '../utils/dateFormat';

const supabaseUrl = 'https://pyoennlhqeomsqgypozz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function postTripApi(userId, dateInfo) {
  const startDate = formatDate(dateInfo[0].startDate);
  const endDate = formatDate(dateInfo[0].endDate);
  const { data, error } = await supabase
    .from('Trips')
    .insert({
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
    })
    .select();
  return data ? data : error;
}

export async function getTripApi(userId, tripId) {
  const { data, error } = await supabase
    .from('Trips')
    .select()
    .eq('trip_id', tripId)
    .eq('user_id', userId);
  return data ? data : error;
}

export async function postPlanApi(placeInfo, tripId, date) {
  const { data, error } = await supabase.from('Plans').insert({
    trip_id: tripId,
    date: date,
    place_name: placeInfo.name,
    description: placeInfo.description,
    category: placeInfo.category,
    time: placeInfo.time,
    road_address: placeInfo.address,
    lat: placeInfo.latitude,
    lng: placeInfo.longitude,
  });
}

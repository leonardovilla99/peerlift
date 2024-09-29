function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (degree) => degree * (Math.PI / 180); // Helper function to convert degrees to radians
  
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
  
    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in kilometers
  
    return distance * 0.621371;
}

export default function sortUsersByDistance(users, refLat, refLon){
    return users
      .map(user => ({
        ...user,
        distance: haversineDistance(refLat, refLon, user.latitude, user.longitude) // Add distance to the user object
      }))
      .sort((a, b) => a.distance - b.distance) // Sort users by the distance in ascending order
}
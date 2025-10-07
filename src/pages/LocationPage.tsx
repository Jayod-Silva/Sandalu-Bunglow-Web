import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import {
  Calendar, MapPin, Thermometer, Sun, Users, Bed, Wifi,
  Utensils, Car, Coffee, Shield, Wind, Star, CheckCircle,
  Mountain, Palmtree, Compass, Camera, Award, Heart
} from 'lucide-react';

interface LocationData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  images: string[];
  bestTimeToVisit: {
    months: string;
    temperature: string;
    activities: string[];
  };
  history: string;
  units?: Array<{
    name: string;
    capacity: number;
    bedrooms: number;
  }>;
  amenities: string[];
  nearbyAttractions: Array<{
    name: string;
    distance: string;
    description: string;
  }>;
  highlights: string[];
}

const LocationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageSet, setCurrentImageSet] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const locationsData: Record<string, LocationData> = {
    'tissamaharama': {
      id: 'tissamaharama',
      name: 'Tissamaharama',
      tagline: 'Where Wildlife Meets the Ocean',
      description: 'Experience the perfect blend of beach relaxation and wildlife adventure in Southern Sri Lanka.',
      heroImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ],
      bestTimeToVisit: {
        months: 'December to March',
        temperature: '25°C - 32°C',
        activities: ['Wildlife Safari', 'Beach Activities', 'Bird Watching', 'Temple Visits', 'Water Sports'],
      },
      history: 'Tissamaharama is an ancient city with a rich heritage dating back over 2,000 years. Once a royal capital of the Ruhuna Kingdom, it is home to magnificent stupas and historical sites. Today, it serves as the gateway to Yala National Park, famous for having one of the highest leopard densities in the world. The area combines cultural significance with natural beauty, offering visitors a unique blend of history, wildlife, and coastal charm.',
      units: [
        { name: 'Unit 1', capacity: 4, bedrooms: 2 },
        { name: 'Unit 2', capacity: 6, bedrooms: 3 },
      ],
      amenities: ['High-Speed WiFi', 'Air Conditioning', 'Private Parking', 'Swimming Pool', 'BBQ Facilities', 'Fully Equipped Kitchen', 'Hot Water', 'Garden Area', 'Security System', 'Laundry Service'],
      nearbyAttractions: [
        { name: 'Yala National Park', distance: '20 km', description: 'Home to leopards, elephants, and diverse wildlife. Best for early morning safaris.' },
        { name: 'Kirinda Beach', distance: '8 km', description: 'Pristine beach with stunning views and ancient temple on the cliff.' },
        { name: 'Tissa Wewa', distance: '2 km', description: 'Ancient reservoir perfect for sunset views and bird watching.' },
        { name: 'Kataragama Temple', distance: '18 km', description: 'Sacred Buddhist and Hindu pilgrimage site with cultural significance.' },
      ],
      highlights: [
        'Gateway to Yala National Park',
        'Rich cultural and historical heritage',
        'Close proximity to pristine beaches',
        'Abundant bird watching opportunities',
        'Authentic local cuisine experiences',
        'Ancient Buddhist stupas and temples',
      ],
    },
    'nuwara-eliya': {
      id: 'nuwara-eliya',
      name: 'Nuwara Eliya',
      tagline: 'The Little England of Sri Lanka',
      description: 'Escape to the cool climate and scenic beauty of Sri Lanka\'s hill country paradise.',
      heroImage: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1920',
      images: [
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ],
      bestTimeToVisit: {
        months: 'January to March, July to August',
        temperature: '14°C - 20°C',
        activities: ['Tea Plantation Tours', 'Hiking', 'Boating', 'Golf', 'Strawberry Picking'],
      },
      history: 'Nuwara Eliya, perched at 1,868 meters above sea level, was developed by British colonials in the 19th century as a hill station retreat. Known as "Little England," it retains much of its colonial charm with Tudor-style architecture, manicured gardens, and a cool climate reminiscent of an English spring. The area is the heart of Sri Lanka\'s tea country, surrounded by emerald green tea plantations that produce some of the world\'s finest Ceylon tea.',
      units: [
        { name: 'Main Bungalow', capacity: 8, bedrooms: 4 },
      ],
      amenities: ['High-Speed WiFi', 'Fireplace', 'Private Parking', 'Mountain Views', 'Tea Garden', 'Fully Equipped Kitchen', 'Hot Water', 'Garden Area', 'Security System', 'Indoor Heating'],
      nearbyAttractions: [
        { name: 'Horton Plains National Park', distance: '32 km', description: 'UNESCO World Heritage Site featuring World\'s End cliff and Baker\'s Falls.' },
        { name: 'Gregory Lake', distance: '3 km', description: 'Scenic lake perfect for boating, cycling, and picnics.' },
        { name: 'Pedro Tea Estate', distance: '5 km', description: 'Historic tea factory offering guided tours and tastings.' },
        { name: 'Hakgala Botanical Gardens', distance: '10 km', description: 'Beautiful gardens with diverse plant species and stunning views.' },
      ],
      highlights: [
        'Cool climate year-round',
        'Surrounded by tea plantations',
        'Colonial architecture and heritage',
        'Hiking trails and waterfalls',
        'Fresh strawberries and vegetables',
        'Golf courses and gardens',
      ],
    },
    'kitulgala': {
      id: 'kitulgala',
      name: 'Kitulgala',
      tagline: 'Adventure in the Heart of Nature',
      description: 'Immerse yourself in thrilling adventures amidst lush rainforests and pristine rivers.',
      heroImage: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920',
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ],
      bestTimeToVisit: {
        months: 'December to April',
        temperature: '22°C - 28°C',
        activities: ['White Water Rafting', 'Canyoning', 'Bird Watching', 'Jungle Trekking', 'Waterfall Visits'],
      },
      history: 'Kitulgala is a small town nestled in the wet zone rainforest of Sri Lanka, famous for its role in the filming of "The Bridge on the River Kwai." The area is blessed with incredible biodiversity and is a paradise for nature enthusiasts and adventure seekers. The Kelani River, which flows through Kitulgala, is considered one of the best white water rafting destinations in Asia. The surrounding rainforest is home to numerous endemic species of flora and fauna.',
      units: [
        { name: 'Riverside Bungalow', capacity: 6, bedrooms: 3 },
      ],
      amenities: ['High-Speed WiFi', 'River Views', 'Private Parking', 'Outdoor Seating', 'BBQ Facilities', 'Fully Equipped Kitchen', 'Hot Water', 'Garden Area', 'Security System', 'Adventure Equipment Storage'],
      nearbyAttractions: [
        { name: 'Kelani River', distance: '500 m', description: 'Premier white water rafting destination with grade 2-3 rapids.' },
        { name: 'Makandawa Forest Reserve', distance: '5 km', description: 'Rich biodiversity hotspot perfect for bird watching and nature walks.' },
        { name: 'Belilena Cave', distance: '8 km', description: 'Archaeological site with evidence of prehistoric human habitation.' },
        { name: 'Aberdeen Falls', distance: '12 km', description: 'Spectacular 98-meter waterfall accessible via scenic hiking trail.' },
      ],
      highlights: [
        'World-class white water rafting',
        'Pristine rainforest environment',
        'Incredible bird watching opportunities',
        'Canyoning and waterfall adventures',
        'Movie filming location heritage',
        'Close to Colombo for easy access',
      ],
    },
  };

  const location = id ? locationsData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (location && location.images.length >= 4) {
      const interval = setInterval(() => {
        setCurrentImageSet((prev) => (prev + 1) % Math.floor(location.images.length / 4));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Location not found</p>
      </div>
    );
  }

  const startIndex = currentImageSet * 4;
  const displayImages = location.images.slice(startIndex, startIndex + 4);

  const amenityIcons: Record<string, any> = {
    'High-Speed WiFi': Wifi,
    'Air Conditioning': Wind,
    'Private Parking': Car,
    'Swimming Pool': Palmtree,
    'Fireplace': Coffee,
    'Security System': Shield,
    'Fully Equipped Kitchen': Utensils,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={location.heroImage}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-amber-400 tracking-widest text-sm uppercase mb-4 animate-fade-in">{location.tagline}</p>
            <h1 className="text-6xl md:text-8xl font-light text-white mb-6 animate-fade-in">{location.name}</h1>
            <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto mb-8 animate-fade-in">
              {location.description}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Calendar size={20} />
              <span className="tracking-wider">Book This Location</span>
            </Link>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 py-20">
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Why Choose {location.name}?</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">{location.history}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transform transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-neutral-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-light text-neutral-900 mb-6">Premium Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {location.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || Star;
                  return (
                    <div
                      key={index}
                      className={`bg-neutral-50 rounded-xl p-4 hover:bg-amber-50 transition-all duration-300 transform ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <Icon className="text-amber-600 mb-2" size={24} />
                      <p className="text-sm text-neutral-700">{amenity}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-light text-neutral-900 mb-6">Nearby Attractions</h3>
              <div className="space-y-4">
                {location.nearbyAttractions.map((attraction, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r from-neutral-50 to-white rounded-xl p-6 border-l-4 border-amber-600 hover:shadow-lg transition-all duration-300 transform ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-medium text-neutral-900">{attraction.name}</h4>
                      <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">{attraction.distance}</span>
                    </div>
                    <p className="text-neutral-600">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-light mb-6">Best Time to Visit</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sun size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-amber-100 mb-1">Ideal Months</p>
                    <p className="text-lg font-medium">{location.bestTimeToVisit.months}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Thermometer size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-amber-100 mb-1">Temperature</p>
                    <p className="text-lg font-medium">{location.bestTimeToVisit.temperature}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-amber-100 mb-3">Popular Activities</p>
                  <div className="flex flex-wrap gap-2">
                    {location.bestTimeToVisit.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/booking"
                className="block w-full mt-8 px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-300 text-center font-medium"
              >
                Check Availability
              </Link>
            </div>

            {location.units && (
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-light mb-6">Available Units</h3>
                <div className="space-y-6">
                  {location.units.map((unit, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <h4 className="text-xl font-medium text-white mb-4">{unit.name}</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-neutral-300">Maximum Guests</p>
                            <p className="text-lg font-medium">{unit.capacity} People</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Bed size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-neutral-300">Bedrooms</p>
                            <p className="text-lg font-medium">{unit.bedrooms} Rooms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-neutral-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-amber-600" size={24} />
                <h3 className="text-xl font-light text-neutral-900">Location</h3>
              </div>
              <p className="text-neutral-700 mb-4">{location.name}, Sri Lanka</p>
              <Link
                to="/contact"
                className="block w-full px-6 py-3 bg-white border-2 border-neutral-300 text-neutral-900 rounded-lg hover:border-amber-600 hover:text-amber-600 transition-all duration-300 text-center"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`mb-20 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-4">Photo Gallery</h2>
            <p className="text-lg text-neutral-600">Explore the beauty of {location.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl aspect-square group cursor-pointer transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img
                  src={image}
                  alt={`${location.name} ${startIndex + index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(location.images.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageSet(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageSet ? 'w-12 bg-amber-600' : 'w-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-12 md:p-16 text-center">
          <Award className="text-amber-400 mx-auto mb-6" size={64} />
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Ready to Experience {location.name}?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Book your unforgettable stay today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-10 py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
            >
              <Calendar size={24} />
              <span className="tracking-wider">Book Your Stay Now</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg transition-all duration-300 text-lg"
            >
              <Heart size={24} />
              <span className="tracking-wider">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LocationPage;
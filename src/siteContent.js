export const business = {
  name: "Philly HVAC Pros",
  company: "Superior Comfort Heating & Cooling LLC",
  phone: "215-416-6557",
  phoneHref: "tel:2154166557",
  email: "1superiorcomfortllc@gmail.com",
  emailHref: "mailto:1superiorcomfortllc@gmail.com",
  address: "545 N 58th Street, Philadelphia, PA 19131",
  mapHref: "https://www.google.com/maps/search/?api=1&query=545+N+58th+Street+Philadelphia+PA+19131",
};

export const services = [
  {
    id: "heating", icon: "heat", name: "Furnaces & Boilers", short: "Heating repair & installation",
    image: "/images/service-philly-heating-v1.webp",
    srcset: "/images/service-philly-heating-v1-640.webp 640w, /images/service-philly-heating-v1-960.webp 960w, /images/service-philly-heating-v1.webp 1536w",
    alt: "Illustrative photograph of a technician inspecting a gas furnace in a Philadelphia brick basement.",
    headline: "Furnace and boiler experts.",
    description: "Repair, installation, and maintenance for gas, oil, and electric furnaces, steam boilers, and hot-water heating. We service cast-iron and high-efficiency systems in homes and commercial properties.",
    mobileDescription: "Gas, oil, and electric furnaces. Steam and hot-water boilers. Repairs, replacements, and maintenance.",
    includes: [
      { icon: "tool", title: "No heat, leaks & pressure issues", detail: "Diagnosis and repair for furnaces and boilers." },
      { icon: "heat", title: "High-efficiency replacements", detail: "90%+ AFUE gas furnaces and condensing boilers." },
      { icon: "home", title: "Hydronic heating & conversions", detail: "Zoning, boiler piping, radiators, and baseboards." },
    ],
    action: "Request Heating Service",
  },
  {
    id: "cooling", icon: "snow", name: "Air Conditioning", short: "Central air & split systems",
    image: "/images/service-philly-cooling-v1.webp",
    srcset: "/images/service-philly-cooling-v1-640.webp 640w, /images/service-philly-cooling-v1-960.webp 960w, /images/service-philly-cooling-v1.webp 1536w",
    alt: "Illustrative photograph of a technician checking a central air conditioner beside a brick home.",
    headline: "Central air, ready for summer.",
    description: "Central air, split-system, and high-velocity AC installation, repair, and tune-ups across the Philadelphia metro area. We service indoor air handlers, evaporator coils, and outdoor condensers.",
    mobileDescription: "Central air and split-system repairs, installations, and seasonal tune-ups throughout the Philly metro area.",
    includes: [
      { icon: "tool", title: "Cooling diagnostics & repairs", detail: "Refrigerant leaks, compressors, frozen coils, and electrical faults." },
      { icon: "snow", title: "AC installation & replacement", detail: "Properly sized condensers, air handlers, and split systems." },
      { icon: "clock", title: "Seasonal preventive maintenance", detail: "Filters, refrigerant checks, coils, and duct inspections." },
    ],
    action: "Request AC Service",
  },
  {
    id: "heat-pumps", icon: "home", name: "Heat Pumps & Mini-Splits", short: "Ducted, ductless & cold-climate",
    image: "/images/service-philly-heat-pumps-v1.webp",
    srcset: "/images/service-philly-heat-pumps-v1-640.webp 640w, /images/service-philly-heat-pumps-v1-960.webp 960w, /images/service-philly-heat-pumps-v1.webp 1536w",
    alt: "Illustrative photograph of a ductless mini-split in a bright Philadelphia rowhouse living room.",
    headline: "Heating and cooling in one.",
    description: "Air-source and cold-climate heat pumps, ducted systems, and ductless mini-splits for older Philadelphia homes, rowhouses, additions, and basements. Choose single-zone or multi-zone comfort without adding ductwork.",
    mobileDescription: "Ducted and ductless heat pumps for older homes, additions, basements, and multi-zone comfort.",
    includes: [
      { icon: "home", title: "Installation & retrofits", detail: "Load calculations, equipment removal, and electrical upgrades as needed." },
      { icon: "tool", title: "Heat-pump repairs", detail: "Frozen units, refrigerant leaks, controls, and airflow problems." },
      { icon: "shield", title: "Maintenance & installation warranties", detail: "Filter service, thermostat upgrades, and warranty-backed new installations." },
    ],
    action: "Request Heat Pump Service",
  },
  {
    id: "water-heaters", icon: "heat", name: "Water Heaters", short: "Gas & electric hot-water service",
    image: "/images/service-philly-water-heaters-v1.webp",
    srcset: "/images/service-philly-water-heaters-v1-640.webp 640w, /images/service-philly-water-heaters-v1-960.webp 960w, /images/service-philly-water-heaters-v1.webp 1536w",
    alt: "Illustrative photograph of an electric storage water heater with copper connections in a tidy utility room.",
    headline: "Restore your hot water.",
    description: "Gas and electric water-heater repair, service, and replacement for homeowners, landlords, property managers, and home warranty customers. Serving Philadelphia, Jenkintown, Bryn Mawr, Ambler, Ardmore, Media, and nearby communities.",
    mobileDescription: "Gas and electric water-heater repair and replacement across Philadelphia and the surrounding counties.",
    includes: [
      { icon: "tool", title: "No hot water or uneven supply", detail: "Heating elements, thermostats, and pilot-light diagnosis." },
      { icon: "shield", title: "Leaks & noisy tanks", detail: "Fittings, relief valves, corrosion, and sediment-related problems." },
      { icon: "home", title: "Replacement & related plumbing", detail: "Water-heater connections, condensate drains, and pumps." },
    ],
    action: "Request Water Heater Service",
  },
  {
    id: "commercial", icon: "tool", name: "Commercial & Rentals", short: "Businesses & property managers",
    image: "/images/service-philly-commercial-v1.webp",
    srcset: "/images/service-philly-commercial-v1-640.webp 640w, /images/service-philly-commercial-v1-960.webp 960w, /images/service-philly-commercial-v1.webp 1536w",
    alt: "Illustrative photograph of a technician inspecting commercial rooftop HVAC equipment.",
    headline: "HVAC for every property.",
    description: "Heating and cooling care for businesses, apartment buildings, rental homes, landlords, and property managers. From an urgent tenant repair to scheduled rooftop equipment maintenance, we help keep your properties running.",
    mobileDescription: "Commercial rooftop equipment, tenant emergencies, rental replacements, and maintenance plans for multiple properties.",
    includes: [
      { icon: "tool", title: "Commercial rooftop equipment", detail: "Installation, repair, filter changes, and preventive maintenance." },
      { icon: "clock", title: "24/7 emergency service", detail: "Urgent heating and cooling repairs for businesses and tenants." },
      { icon: "home", title: "Property maintenance agreements", detail: "Apartment plans, rental replacements, and multi-property coverage." },
    ],
    action: "Request Commercial Service",
  },
  {
    id: "air-quality", icon: "air", name: "Air Quality & Controls", short: "Filtration, humidity & thermostats",
    image: "/images/service-philly-air-quality-v1.webp",
    srcset: "/images/service-philly-air-quality-v1-640.webp 640w, /images/service-philly-air-quality-v1-960.webp 960w, /images/service-philly-air-quality-v1.webp 1536w",
    alt: "Illustrative photograph of gloved hands fitting a pleated air filter into an air-handler filter rack.",
    headline: "Cleaner air. Smarter control.",
    description: "Indoor air quality and control upgrades tailored to your property. We install air purifiers, UV germicidal lights, humidity controls, and smart thermostats, and provide duct cleaning and filter service.",
    mobileDescription: "Air purifiers, UV lights, humidity control, duct cleaning, and smart thermostat upgrades for your property.",
    includes: [
      { icon: "shield", title: "Purification & filtration", detail: "Air purifiers, UV lights, and replacement filters." },
      { icon: "air", title: "Ducts & humidity", detail: "Duct cleaning, airflow checks, and moisture control." },
      { icon: "home", title: "Smart thermostat upgrades", detail: "Programmable controls and energy-efficiency improvements." },
    ],
    action: "Request Air Quality Service",
  },
];

export const serviceOptions = [
  ...services.map(({ name, icon }) => ({ value: name, label: name, icon })),
  { value: "Emergency HVAC repair", label: "Emergency HVAC repair", icon: "clock" },
  { value: "General inquiry", label: "Help choosing a service", icon: "conversation" },
];

export const brands = ["Carrier", "Trane", "Lennox", "Rheem", "Bryant", "Goodman", "Mitsubishi", "Daikin", "LG"];

export const serviceAreas = [
  {
    title: "Philadelphia", icon: "home",
    description: "Heating, cooling, and hot-water service throughout the city.",
    places: ["Center City", "Northeast Philadelphia", "Northwest Philadelphia", "South Philadelphia", "Rittenhouse Square", "Society Hill", "Fitler Square", "Chestnut Hill", "East Falls", "Manayunk", "Roxborough", "Fairmount", "Queen Village", "Old City", "Mount Airy"],
  },
  {
    title: "The Main Line", icon: "pin",
    description: "Serving Main Line homes and businesses since 2018.",
    places: ["Ardmore", "Bryn Mawr", "Wayne", "Haverford", "Villanova", "Berwyn", "Narberth", "Merion", "Wynnewood", "Rosemont", "Penn Valley", "Gladwyne", "Bala Cynwyd", "Devon", "Malvern"],
  },
  {
    title: "Surrounding communities", icon: "tool",
    description: "Delaware, Montgomery, Bucks, and Chester counties.",
    places: ["Media", "Springfield", "Upper Darby", "Havertown", "Ridley Park", "Lansdowne", "Swarthmore", "Yeadon", "Darby", "Jenkintown", "Ambler"],
  },
];

export const customerStories = [
  { name: "James T.", location: "Ardmore", service: "Boiler repair", summary: "An emergency boiler failure on a January evening was resolved with heat restored that same night." },
  { name: "Sarah M.", location: "Bryn Mawr", service: "AC installation", summary: "After comparing three quotes, Sarah chose Philly HVAC Pros for the pricing and described an installation completed in one day." },
  { name: "Michael & Lisa R.", location: "Wayne", service: "Furnace repair", summary: "A furnace diagnosis led to a repair instead of replacement, with clear advice about the more economical option." },
];

export const faqs = [
  { question: "What heating and cooling services do you offer?", mobileQuestion: "What services do you offer?", answer: "We repair, install, and maintain furnaces, steam and hot-water boilers, central air, split systems, heat pumps, and ductless mini-splits. We also handle water heaters, indoor air quality, thermostats, and commercial rooftop equipment." },
  { question: "Do you offer same-day and emergency HVAC service?", mobileQuestion: "Do you offer emergency service?", answer: "Yes. We offer 24/7 emergency heating and cooling support and prioritize same-day appointments for no-heat, no-cool, and urgent problems. Call 215-416-6557 to confirm availability for your address." },
  { question: "Which Philadelphia-area communities do you serve?", mobileQuestion: "Do you serve my area?", answer: "We serve Philadelphia, the Main Line, and Delaware, Montgomery, Bucks, and Chester counties. Coverage includes Ardmore, Bryn Mawr, Wayne, Springfield, Upper Darby, Jenkintown, Ambler, and nearby towns. Call to confirm service for your property." },
  { question: "Can you service older steam and hot-water boilers?", mobileQuestion: "Do you work on older boilers?", answer: "Yes. We service steam, hot-water, cast-iron, and high-efficiency boilers in older Philadelphia and Main Line homes. Our work includes leaks, pressure issues, hydronic zones, radiator and baseboard connections, and steam-to-hot-water conversions." },
  { question: "Which brands and ductless systems do you service?", mobileQuestion: "Which brands do you service?", answer: "We service all major brands, including Carrier, Trane, Lennox, Rheem, Bryant, and Goodman. Our ductless work includes Mitsubishi, Daikin, LG, and other leading brands. Heat pumps and mini-splits are available for homes without existing ductwork." },
  { question: "Do you offer maintenance for rentals and businesses?", mobileQuestion: "Do you maintain rental properties?", answer: "Yes. We offer maintenance for apartment buildings, rental homes, and businesses, including multi-property agreements, rooftop equipment service, filter changes, tenant emergency repairs, and replacement systems." },
  { question: "Are you licensed and insured in Pennsylvania?", mobileQuestion: "Are you licensed and insured?", answer: "Yes. Superior Comfort Heating & Cooling LLC is a licensed and insured Pennsylvania HVAC contractor serving Philadelphia and the surrounding counties." },
  { question: "How do estimates and diagnostic charges work?", mobileQuestion: "How does pricing work?", answer: "We offer free estimates and provide a written quote before work begins. Diagnostic visits start at a flat rate; repair costs depend on the problem. Call 215-416-6557 for the diagnostic charge and the options for your system." },
  { question: "Do you accept home warranty service requests?", mobileQuestion: "Do you work with home warranties?", answer: "We welcome home warranty customers and work with most home warranty companies for HVAC and water-heater service. Contact us to confirm your provider and coverage. New heat-pump installations include warranties; ask for the terms for your equipment." },
  { question: "Can an efficient heating upgrade qualify for incentives?", mobileQuestion: "Are incentives available?", answer: "Some high-efficiency furnaces and boilers may qualify for utility rebates, tax credits, or other incentives. We help select equipment and plan the installation around efficiency requirements. Eligibility and available programs need to be confirmed for your project." },
  { question: "What does preventive maintenance include?", mobileQuestion: "What is included in maintenance?", answer: "Maintenance may include filters, coils, refrigerant checks, duct inspections, lubrication, and checks of heating components and operation. Annual furnace service can also help meet manufacturer maintenance requirements. The work depends on your equipment." },
  { question: "How do I arrange service or request an estimate?", mobileQuestion: "How do I book service?", answer: "Call 215-416-6557 or email 1superiorcomfortllc@gmail.com with your address and service needs. You can also prepare a request draft here to share by email. For an emergency, call directly." },
];

<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Fragrance
        Product::create([
            'name' => 'BEAU DE JOUR',
            'price' => 136,
            'description' => 'FRAGRANCE DESCIRPTION:
            LAVENDER PULSES WITH CLEAN, COMMANDING POWER, AS FLORAL GREEN GERANIUM CREATES A POWERFUL CONTRAST TO THE LEATHER-LIKE OAKMOSS. THE SENSUAL MUSKY WARMTH OF PATCHOULI AND AMBER FURTHER ELEVATE THE MASCULINE INTENSITY',
            'image' => 'https://i1.adis.ws/i/tom_ford/T8EF_OC_50ML_A?$pdp_hero_mob$&&bg=rgb(255,255,255)',
            'categories' => ['women', 'fragrance', 'signature'],
        ]);

        Product::create([
            'name' => 'ROSE PRICK CANDLE',
            'price' => 135,
            'description' => 'INSPIRED BY TOM FORDS PRIVATE ROSE GARDEN, ROSE PRICK IS A WILD BOUQUET OF BEAUTIFUL BREEDS OF ROSE -- ROSE DE MAI, TURKISH AND BULGARIAN SHARP AND PRISTINE THE PIERCING PRICKLES OF THE STEMS HOOK ONTO EACH OTHER, BONDING THEIR BLOOMS IN PINK PERFECTION. A ROSE BY ANY OTHER NAME, WOULDNT BE TOM FORD',
            'image' => 'https://i1.adis.ws/i/tom_ford/T9A6_OC_OS_A?$pdp_hero_mob$&&bg=rgb(255,255,255)',
            'categories' => ['women', 'men', 'fragrance', 'candles'],
        ]);


        //Face
        Product::create([
            'name' => 'SHADE AND ILLUMINATE BRUSH 04',
            'price' => 73,
            'description' => 'AN ULTIMATE SHADE AND ILLUMINATE BRUSH DESIGNED ESPECIALLY FOR STREAK-FREE APPLICATION.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T6C6_OC_OS_A?$hires$&bg=rgb(255,255,255)&bg=rgb(255,255,255)',
            'categories' => ['women', 'face', 'brushes'],
        ]);

        Product::create([
            'name' => 'ILLUMINATING POWDER',
            'price' => 84,
            'description' => 'LIGHT-DIFFUSING. SILK-LIKE. WEIGHTLESS. A WEIGHTLESS AND UNDETECTABLE MICRO-FINE POWDER THAT ENSURES A NATURAL AND EVEN FINISH. A WEIGHTLESS AND UNDETECTABLE MICRO-FINE POWDER WITH SPECIALLY COATED PIGMENTS CREATES A DIAPHANOUS VEIL OF LIGHT ON THE FACE. ULTRA-GLIDING TEXTURE BLENDS FLUIDLY ON SKIN, MOISTURIZING AND REDEFINING THE COMPLEXION TO ENSURE A NATURAL AND EVEN FINISH. CUSTOM APPLICATOR BRUSH INCLUDED',
            'image' => 'https://i1.adis.ws/i/tom_ford/T0T8_TRANSLUCENT_OS_A?$pdp_hero_dsk$&bg=rgb(255,255,255)',
            'categories' => ['women', 'face', 'powder'],
        ]);

        //Lips

        Product::create([
            'name' => 'SCARLET ROGUE',
            'price' => 58,
            'description' => 'FROM SECOND-SKIN NUDES TO BLAZING REDS, EACH LIP COLOR DELIVERS A MOISTURIZING, FADE-RESISTANT, COLOR-TRUE FINISH FOR EIGHT HOURS OF INTENSE, SATURATED SHADE FIDELITY AND IMPECCABLE POLISH OFFERED IN ICONIC TOM FORD PACKAGING.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T0T3_SCARLETROUGE_OS_A?$pdp_hero_dsk$&bg=rgb(255,255,255)',
            'categories' => ['women', 'lips', 'lips color'],
        ]);

        Product::create([
            'name' => '07 DYLAN',
            'price' => 36,
            'description' => '50 BOYS MEET 50 GIRLS. TOM FORDS CELEBRATED CLUTCH-SIZED LIPS AND BOYS COLLECTION. NAMED AFTER MEN AND WOMEN HE ADMIRES, FROM INTIMATES TO COLLABORATORS FROM AROUND THE WORLD. DESIGNED TO BE WORN ON THEIR OWN OR LAYERED WITH ONE ANOTHER, EACH TRANSFORMING COLOR AND FINISH AMPLIFIES A WOMAN OR MANS INDIVIDUALITY WHILE INCITING AN INSATIABLE DESIRE TO TRY MORE THAN ONE. THE DECADENT WARDROBE OF RICH, SPECIALLY TREATED PIGMENTS ARE BLENDED TO DELIVER PURE COLOR IN ULTRA-KISSABLE MATTE, CREAM AND METALLIC FINISHES.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T31H-1_DYLAN_OS_A?sm=aspect&aspect=3.14:4&w=648&img404=img404&bg=rgb(218,218,218)',
            'categories' => ['women', 'men', 'lips', 'boys & girls'],
        ]);

        //Men
        Product::create([
            'name' => 'SHAVE OIL',
            'price' => 67,
            'description' => 'SOFTENS. CALMS. REPAIRS.
            THIS ULTRA-LUXE SHAVE OIL MOISTURIZES, CONDITIONS AND CUSHIONS FOR A CLOSE SHAVE. SOOTHING AND CALMING, SHAVE OIL HELPS PROTECT SKIN DURING SHAVING AND HELPS SOOTHE THE LOOK OF IRRITATION WHILE CREATING AN INVIGORATING OLFACTIVE EXPERIENCE FEATURING A UNIQUE SCENT BLEND. THE LIGHTWEIGHT FORMULA CAN BE USED ALONE OR UNDER SHAVE CREAM. FEATURES: TOM FORD FOR MEN SKIN CALMING COMPLEX TOM FORD PURIFYING COMPLEX USAGE WET FACE WITH WARM WATER THEN MASSAGE A FEW DROPS INTO BEARD. SHAVE AS USUAL. CAN BE USED UNDER SHAVE CREAM FOR A MORE SENSORIAL SHAVE',
            'image' => 'https://i1.adis.ws/i/tom_ford/T445-01-0001_OC_OS_A?$pdp_hero_mob$&&bg=rgb(255,255,255)',
            'categories' => ['men', 'beard'],
        ]);

        Product::create([
            'name' => 'OUD WOOD ALL OVER BODY SPRAY',
            'price' => 79,
            'description' => 'RARE. EXOTIC. DISTINCTIVE.
            ONE OF THE MOST RARE, PRECIOUS, AND EXPENSIVE INGREDIENTS IN A PERFUMERS ARSENAL, OUD WOOD IS OFTEN BURNED IN INCENSE-FILLED TEMPLES. EXOTIC ROSE WOOD AND CARDAMOM GIVE WAY TO A SMOKY BLEND OF RARE OUD WOOD, SANDALWOOD AND VETIVER. TONKA BEAN AND AMBER ADD WARMTH AND SENSUALITY.
            INFUSED WITH THE RARE AND DISTINCT SCENT OF OUD WOOD, THIS PORTABLE ALL OVER BODY SPRAY SCENTS THE SKIN LEAVING IT FEELING REFRESHED AND INVIGORATED.
            USAGE: SPRAY ALL OVER THE BODY, AVOIDING FACE AND EYES.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T2CL-01_OC_OS_A?$pdp_hero_mob$&&bg=rgb(255,255,255)',
            'categories' => ['men', 'body'],
        ]);

        // Eyes

        Product::create([
            'name' => 'ULTRA LENGTH MASCARA',
            'price' => 46,
            'description' => 'HEIGHTEN THE IMPACT OF THE PERFECT TOM FORD EYE WITH MASCARA THAT GIVES EXTRA-LONG EXTENSION. THIS SUPER-BLACK MASCARA IS DESIGNED TO DELIVER EXTREME LENGTHENING WITH EXTRAORDINARY LONG-WEAR. IT IS SPECIALLY FORMULATED TO RESIST THE EFFECTS OF HIGH TEMPERATURE AND HUMIDITY.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T1FJ_ULTRARAVEN_OS_A?$pdp_hero_mob$&&bg=rgb(255,255,255)',
            'categories' => ['women', 'eyes', 'mascara'],
        ]);

        Product::create([
            'name' => 'BROW SCULPTOR WITH REFILL',
            'price' => 54,
            'description' => 'TO TOM FORD, THE EYEBROWS ARE ONE OF THE MOST IMPORTANT ELEMENTS OF YOUR FACE ARCHITECTURE. A PERFECTLY GROOMED AND SHAPED BROW IS THE MOST POWERFUL NON-INVASIVE WAY TO DEFINE AND ENHANCE YOUR FEATURES. THE UNIQUE CALLIGRAPHY TIP ALLOWS A TAILOR-MADE STROKE, FROM THIN TO WIDE.
            REMOVE THE OPPOSITE-END CAP TO UNCOVER THE GROOMING BRUSH; TWIST THE CAP COUNTERCLOCKWISE TO REVEAL THE SHARPENER. INCLUDES
            ONE REFILL. TO REFILL, PULL OUT EMPTY CARTRIDGE AND INSERT REPLACEMENT UNTIL IT CLICKS.',
            'image' => 'https://i1.adis.ws/i/tom_ford/T5JJ_BLONDE_OS_A?$pdp_hero_dsk$&bg=rgb(255,255,255)',
            'categories' => ['women', 'eyes', 'brows'],
        ]);
    }
}

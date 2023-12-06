# Digital Materialities

### Tutorial
https://www.youtube.com/watch?v=8bbTkNZYdQ8&ab_channel=Radian628

### Iteration
1. Basic shader

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/98d50ea2-f987-4d9a-a549-3f4e1c4460cf)

2. Add time attribute to make animation

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/670977cb-3f8b-4e47-a604-e8658fb00892)

3. Add more iteration

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/5de07fba-d4e3-4eff-bc91-afca405f8436)
It could make a sense of painting.

4. Change fractual branches quantity

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/7b0de7c7-8ed8-4747-94f2-9b39737f4cf0)
When the fractual decreased, it looked like some cells.

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/a6d1ee85-1fe7-4428-b9ea-cc0da538e8ef)
When the fractual increased, it looked like noise.

5. Add color

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/6d92c5fd-9c1c-4ca4-9a6f-6b168cc371e2)
Only center had the color.

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/72ebaeb5-4848-457e-a8df-924c244f345b)
I deleted one attribute and it looked better. But it lost some details.

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/5c4f4e40-cd69-41f8-8606-2f62fad5bf31)
![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/c58fe06a-0ae5-4b82-9765-41e65e08a5c0)
![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/ced82c0c-d418-4488-9b2a-811a8bf5d89e)
Add more color detail.

### Final Collection
```
vec3 palette( in float t)
{
    vec3 a = vec3(1.000, 0.500, 0.500);
    vec3 b = vec3(0.500, 0.500, 0.500);
    vec3 c = vec3(0.750, 1.000, 0.667);
    vec3 d = vec3(0.800, 1.000, 0.333);
    
    return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.x;
    vec2 uv0 = uv;
    
    float angle = iTime * 0.01;
    
    vec3 col = vec3(0.0);
    
    for(float i = 0.0; i < 32.0; i += 1.0){
        uv = abs(uv);
        uv -= 0.5;
        uv *= 1.015;
        uv *= mat2(
            cos(angle), -sin(angle), 
            sin(angle), cos(angle));
            
        float d = length(uv) * exp(-length(uv0));
        //d = sin(d * 8. + iTime)/8.0;
        //d = abs(d);
        
        col = palette(length(uv) + i * 0.1 + iTime * 0.1);
        col += d;
    }
    
    fragColor = vec4(col, 1.0);
}
```

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/80d642c9-43e1-4eba-adf8-5662cca34cc3)


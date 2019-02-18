#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 position;
mat2 rot;
float scl, scl2, scl3, pos_x, pos_y, pos_z, scltime;

void main( void ) {

	position = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
	scltime = sin(time * 0.1)*7.5;
	rot = mat2(cos(scltime), -1.0 * sin(scltime), sin(scltime), cos(scltime));
	position.x = sin(dot(position, rot[0])*3.0)*0.5;
	position.y = cos(dot(position, rot[1])*3.0)*0.5;
	scl = 7.0 * sign(sin(time*20.0)) + 1.0;
	scl2 = 3.0 * sign(sin(time*21.0)) + 1.0;
	scl3 = 2.0 * sign(sin(time*22.0)) + 1.0;
	pos_x = fract(pow(position.x, 2.0)*scl);
	pos_y = fract(pow(position.y, 2.0)*scl2);
	pos_z = fract(fract(sin(pos_x * pos_y)*12.5) * scl3);
	
	
	gl_FragColor = vec4(abs(pos_x*0.55)*5.0, abs(pos_y*0.25)*3.0, abs(pos_z*0.65)*2.0, 1.0);
}

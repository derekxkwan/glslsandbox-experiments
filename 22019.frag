#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float timez, pos_x, pos_y;

float scl_x, scl_y, scltime, mod_x, mod_y;
mat2 rot;
vec2 pre_pos, new_pos, new_scl, new_mod;
void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy);
	scltime = sin(time/5.0);
	rot = mat2(cos(scltime), -1.0 * sin(scltime), sin(scltime), cos(scltime));
	pre_pos = vec2(position.x, position.y);
	position.x = sin(dot(pre_pos, rot[0])*2.35)*2.25;
	position.y = cos(dot(pre_pos, rot[1])*1.75)*3.75;
	position.x = sin(dot(position, rot[0])*0.31)*1.5;
	position.y = cos(dot(position, rot[1])*0.45)*1.75;
	position.x = sin(dot(position, rot[0])*0.35)*2.5;
	position.y = sin(dot(position, rot[1])*0.41)*1.7;
	scl_x = 6.5*(sin(time/10.0)*2.6 + 3.0);
	scl_y = 4.25*(cos(time/11.0)*1.1 + 4.5);
	new_scl = vec2(scl_x, scl_y);
	scl_x = sin(dot(new_scl, rot[0])*0.1)*3.5+1.5;
	scl_y = cos(dot(new_scl, rot[1])*0.05)*1.3+2.25;
	new_scl = vec2(scl_x, scl_y);
	scl_x = cos(dot(new_scl, rot[0])*0.08)*2.5+5.0;
	scl_y = sin(dot(new_scl, rot[1])*0.05)*2.5+5.0;
	mod_x = cos((time/8.0) + 3.0)*1.5 + 1.85 ;
	mod_y = sin((time/5.5) + 1.5)*2.9 + 2.25 ;
	new_mod = vec2(mod_x, mod_y);
	mod_x = sin(dot(new_mod, rot[0])*1.08)*3.0+1.5;
	mod_y = sin(dot(new_mod, rot[1])*0.59)*1.75+2.5;
	new_mod = vec2(mod_x, mod_y);
	mod_x = sin(dot(new_mod, rot[0])*0.07)*1.0+1.5;
	mod_y = sin(dot(new_mod, rot[1])*0.06)*2.0+3.0;
	
	
	timez = cos(sin(time/4.5)*cos(time/2.0+1.0)*3.0)*2.0;
	pos_x = abs(fract(mod(position.x *scl_x, mod_x)) * 5.0 - 1.0)*5.14*timez;
	pos_y = abs(fract(mod(position.y * scl_y,mod_y)) * 8.0 - 1.0)*3.14*timez;
	new_pos = vec2(pos_x, pos_y);
	pos_x = sin(dot(new_pos, rot[0])*0.5)*0.5;
	pos_y = sin(dot(new_pos, rot[1])*0.7)*0.5;
	

	gl_FragColor = vec4(pos_x, pos_y, mod(pos_x * pos_y, 0.5)*1.5, 1.0);

}
